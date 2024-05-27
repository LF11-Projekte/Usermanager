import express from 'express';
import {me} from '../controllers/user';

export const router = express.Router();

router.get('/me', me)
