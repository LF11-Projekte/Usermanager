// ---------------------------------------------------------------------------------------------------------------------
import { Request, Response, NextFunction } from 'express';
// ---------------------------------------------------------------------------------------------------------------------
import { AppDataSource } from "../data-source";
import { User } from '../entity/User';
import {UploadedFile} from "express-fileupload";
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

export const user = async (req: Request, res: Response) => {
    userRepo.findOneByOrFail({adName: req.params.ad})
        .catch(reason => {
            res.sendStatus(404); // rip
        })
        .then(value => {
            res.send(value);
        })
};

export const putDisplayName = async (req: Request, res: Response) => {
    const { displayName } = req.body;

    userRepo.findOneByOrFail({adName: res.locals["user"]})
        .catch(reason => {
            res.sendStatus(403); // rip
        })
        .then(value => {
            if (value instanceof User) {
                value.displayName = displayName;
                userRepo.save(value);
                res.sendStatus(200);
            }
        })
};

export const putDescription = async (req: Request, res: Response) => {
    const { description } = req.body;

    userRepo.findOneByOrFail({adName: res.locals["user"]})
        .catch(reason => {
            res.sendStatus(403); // rip
        })
        .then(value => {
            if (value instanceof User) {
                value.description = description;
                userRepo.save(value);
                res.sendStatus(200);
            }
        })
};

export const uploadProfilePicture = async (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400);
    }

    let file = req.files.pfp as UploadedFile;
    let uploadPath = __dirname + '/../../media/' + file.name

    file.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        userRepo.findOneByOrFail({adName: res.locals["user"]})
            .catch(reason => {
                res.sendStatus(403); // rip
            })
            .then(value => {
                if (value instanceof User) {
                    value.profilePicture = '/media/' + file.name;
                    userRepo.save(value);
                    res.sendStatus(200);
                }
            })
    });

}