import express from 'express';
import {escape, login, loginForm, get_verify} from '../controllers/auth';

export const router = express.Router();

router.post('/login', login)
router.get('/login-form', loginForm)
router.get('/escape', escape)
router.get('/verify', get_verify)
