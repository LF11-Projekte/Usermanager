import express from 'express';
import { router as authRouter } from "./routes/auth";
import { router as userRouter } from "./routes/user";

const routes = express.Router();

routes.use('/auth', authRouter);
routes.use('/user', userRouter);

export default routes;