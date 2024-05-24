import { Request, Response, NextFunction } from 'express';
//import axios, {AxiosResponse} from 'axios';

export const testFunction = async (req: Request, res: Response, next: NextFunction) => {
    return res.send("ok");
};