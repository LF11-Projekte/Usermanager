import express from 'express';
import {escape, login, loginForm} from '../controllers/auth';

export const router = express.Router();

router.post('/login', login)
router.get('/login-form', loginForm)
router.get('/escape', escape)
