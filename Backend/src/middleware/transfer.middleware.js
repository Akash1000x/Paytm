import mongoose from 'mongoose'
import Account from '../models/accounts.model.js';

const transferFunds = async (toAccountId, amount,req) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { balance } = await Account.findOne({
        userId: req.user_id,
      }).session(session);
  
      if (balance < amount)
        return res.status(403).json({ message: "insufficient balance" });
  
      const toAccount = await Account.findOne({ userId: toAccountId }).session(
        session
      );
  
      if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Invalid account" });
      }
  
      await Account.updateOne(
        { userId: req.user_id },
        { $inc: { balance: -amount } }
      ).session(session);
      await Account.updateOne(
        { userId: toAccountId },
        { $inc: { balance: amount } }
      ).session(session);
  
      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  };

  export default transferFunds;