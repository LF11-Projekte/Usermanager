import express from 'express';
import { testFunction } from '../controllers/test.controller';

const router = express.Router();

router.use('/test', testFunction)

export default router;