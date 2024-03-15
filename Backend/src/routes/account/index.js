import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import Account from "../../models/accounts.model.js";
import transferFunds from "../../middleware/transfer.middleware.js";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const { balance } = await Account.findOne({ userId: req.user_id });
  if (balance) return res.status(200).json({ balance: balance });
  return res.status(400).json({ message: "sommethig went wrong!" });
});


router.put("/transfer", authMiddleware, async (req, res) => {
  const { toAccountId, amount } = req.body;
  //validation input data
  if (!toAccountId || !amount) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const transfarDone = await transferFunds(toAccountId, amount,req);

  if (transfarDone)
    return res.status(200).json({ message: "transfer succefully" });

  return res.status(401).json({ message: "error in transfering" });
});

export default router;
