import express from 'express';
import {me, user, putDisplayName, putDescription, uploadProfilePicture} from '../controllers/user';

export const router = express.Router();

// User-lookup
router.get('/me', me)
router.get('/:ad', user)

// Profilbearbeitung
router.put('/me/displayname', putDisplayName)
router.put('/me/description', putDescription)
router.post('/me/upload', uploadProfilePicture)
