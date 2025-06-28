import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {Account} from '../db.js'
import { default as mongoose } from 'mongoose';

const router = express.Router();


export default router