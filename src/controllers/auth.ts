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
ldapClient.on("connect", () => console.log("connection to ldap established"));
ldapClient.on("connectError", (err) => console.log(err));

export const login = async (req: Request, res: Response) => {
    
    const { redirect, username, password } = req.body;

    if (!username || !password) {
        res.sendStatus(400);
        return;
    }

    let success = await new Promise((resolve) => {
        ldapClient.bind(`cn=${username},cn=Users,dc=ulfx,dc=local`, password, function(err) {
            resolve(err === null);
        });
    })

    if (!success) {
        res.sendStatus(400);
        return;
    }

    userRepo.findOneByOrFail({ adName: username })
    .catch(async () => {
        await userRepo.save(new User({
            adName: username,
            displayName: username
        }));
    })
    .finally(async () => {
        let user = await userRepo.findOneBy({adName: username})
        let token = await tokenRepo.save(new Token({user: user}))
        let payload = {user: user.adName, accessToken: token.accessToken, refreshToken: token.refreshToken, expires: token.expire};
        jwt.sign(payload, JWT_SECRET, (err, signedToken) => {
            if (err)
                res.sendStatus(500)
            else
                if (redirect)
                    res.redirect(redirect + "?token=" + signedToken);
                else
                    res.send(signedToken);
        })
    });
};

// middleware function
export const verifyToken = async (req: Request, res: Response, next) => {

    if (req.url === "/auth/login") {
        next();
        return;
    }

    let token = req.headers.authorization;
    if (!token) {
        res.sendStatus(401);
        return;
    }

    let jwtToken = token.split(" ")[1];
    if (!jwtToken) {
        res.sendStatus(401);
        return;
    }

    let payload;
    try {
        payload = jwt.verify(jwtToken, JWT_SECRET);
    } catch (err) {
        console.log(`cannot verify JWT Token (${jwtToken})`);
        res.sendStatus(401);
        return;
    }

    tokenRepo.findOneByOrFail({ accessToken: payload.accessToken, user: { adName: payload.user }})
    .then((token) => {
        userRepo.findOneByOrFail({ id: token.id, adName: payload.user })
        .then(() => next())
        .catch(() => res.sendStatus(401));
    })
    .catch(() => res.sendStatus(401))
}