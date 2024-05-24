import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source";
import { User } from '../entity/User';
import { Token } from '../entity/Token';

const userRepo = AppDataSource.getRepository(User);
const tokenRepo = AppDataSource.getRepository(Token);

export const login = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method != "POST") return res.status(405).send("rip");

    const { user, password} = req.body;
   
    // ### LDAP MAGIC ###

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
                res.send(token);
            });
        })
    });
};