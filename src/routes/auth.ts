import express from 'express';
import { login } from '../controllers/auth';

export const router = express.Router();

router.post('/login', login)
