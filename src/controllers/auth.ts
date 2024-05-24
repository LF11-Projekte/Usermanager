import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source";
import { User } from '../entity/User';
import { Token } from '../entity/Token';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, LDAP_URLs } from '../config';
import ldap from 'ldapjs';

const userRepo = AppDataSource.getRepository(User);
const tokenRepo = AppDataSource.getRepository(Token);
const ldapClient = ldap.createClient({url: LDAP_URLs});

export const login = async (req: Request, res: Response, next: NextFunction) => {
    
    const { redirect, user, password } = req.body;

    let success = ldapClient.bind(`cn=${user},cn=Users,dc=ulfx,dc=local`, password, function(err) {
        return err ? false : true;
    });

    if (!success) {
        res.send(401);
        return;
    }

    userRepo.findOneByOrFail({ adName: user })
    .catch(() => {
        userRepo.save(new User({
            adName: user,
            displayName: user
        }));
    })
    .finally(() => {
        userRepo.findOneBy({adName: user})
        .then((user) => {
            tokenRepo.save(new Token({
                user: user
            }))
            .then(token => {
                let payload = {user: user, accessToken: token.accessToken, refreshToken: token.refreshToken, expires: token.expire};
                jwt.sign(payload, JWT_SECRET, (err, signedToken) => {
                    if (err) {res.sendStatus(500)};
                    res.redirect(redirect + "?token=" + signedToken);
                })
            });
        })
    });
};