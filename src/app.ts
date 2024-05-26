import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes';

import cookieParser from "cookie-parser";
import session from "express-session";

import { AppDataSource } from "./data-source"
import { verifyToken } from './controllers/auth';

AppDataSource.initialize().then(async () => {
    const app: Express = express();
    
    app.use(cookieParser()).use(session({ secret: Math.random().toString() }));
    
    /** Logging */
    app.use(morgan('dev'));
    
    /** Parse the request */
    app.use(express.urlencoded({extended: false}));
    
    /** Takes care of JSON data */
    app.use(express.json());
    
    /** RULES OF OUR API*/
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization')

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
            return res.status(200).json({});
        }
        next();
    });

    app.use(verifyToken);
    
    /** Routes */
    app.use('/', routes);
    
    /** Error handling */
    // app.use((req, res, next) => {
    //     const error = new Error('not found');
    //     return res.status(404).json({
    //         message: error.message
    //     });
    // });
    
    /** Server */
    const httpServer = http.createServer(app);
    const PORT: any = process.env.PORT ?? 3000;
    httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

}).catch((error: any) => console.log(error));