import express from 'express';
import { authMiddleware } from '../middleware';
import { Account } from '../db';
import { default as mongoose } from 'mongoose';

const router = express.Router();


module.exports = router;