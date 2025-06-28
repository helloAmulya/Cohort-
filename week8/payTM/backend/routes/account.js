// routes/account.js

import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { Account } from '../db.js';

const router = express.Router();


// authmiddleware is only required for protected routes, not for signin and signup,
//  for like getting balance details, user dashboard etc 
// we need to automatically pass the token for authorization 




router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      balance: account.balance,
    });
  } catch (err) {
    console.error("Error getting balance:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
