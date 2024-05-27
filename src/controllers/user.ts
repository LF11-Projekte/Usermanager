// ---------------------------------------------------------------------------------------------------------------------
import { Request, Response, NextFunction } from 'express';
// ---------------------------------------------------------------------------------------------------------------------
import { AppDataSource } from "../data-source";
import { User } from '../entity/User';
// ---------------------------------------------------------------------------------------------------------------------

const userRepo = AppDataSource.getRepository(User);

export const me = async (req: Request, res: Response) => {
    userRepo.findOneByOrFail({adName: res.locals["user"]})
        .catch(reason => {
            res.sendStatus(403); // rip
        })
        .then(value => {
            res.send(value);
        })
};