import express from 'express';
import { login } from '../controllers/session.controller';

const router = express.Router();

router.use('/session/login', login)

export default router;