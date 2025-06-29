// routes/account.js

import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { Account } from '../db.js';

const router = express.Router();


// authmiddleware is only required for protected routes, not for signin and signup,
//  for like getting balance details, user dashboard etc 
// we need to automatically pass the token for authorization 

/*
   Docs:
   1. this is to perform the transactions, money transfer
   - we first use authMiddleware to check for available balance of the user through userId
   
   2. transfer (transactions involve some complexity)
   - first we check for the authentication through the authMiddleware, from the stored jwt tokens
   - then we start a mongoose session by startSession(), this is to ??
   - wraping in the try catch we start the session.startTransaction(), this is a phase whare the session is locked and we can proceed for transactions (ACID)
   - get userId , 'amount' and receiver Id in from of 'to'
   - check the userId , and the amount is number and not invalid like '-amount' this will crash
   - find the sender, verify its balance and abort if balance less than the amount to deduct
   - using the userId of sender and receiver , and this { $inc: { balance: -amount } }, perform the transaction (attach session(session), this means all this are part of the same the ongoing session or (currently active transaction session) )
   - wait for the transaction to complete -> session.commitTransaction()
   - session.endSession() to end 

   */


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


router.post('/transfer', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { amount, to } = req.body;

    // check the amount 
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // no self transfer
    if (req.userId === to) {
      return res.status(400).json({ message: "Cannot transfer to self" });
    }

    const sender = await Account.findOne({ userId: req.userId }).session(session);

    if (!sender || sender.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const receiver = await Account.findOne({ userId: to }).session(session);
    if (!receiver) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Receiver not found" });
    }


    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();

    res.status(200).json({ message: "Transfer successful" });

  } catch (error) {
    await session.abortTransaction();
    console.error("Transfer failed:", error);
    res.status(500).json({ message: "Transaction failed", error: error.message });
  } finally {
    session.endSession();
  }
});


export default router;
