import express from 'express';
import { router as authRouter } from "./routes/auth";

const routes = express.Router();

routes.use('/auth', authRouter);

export default routes;