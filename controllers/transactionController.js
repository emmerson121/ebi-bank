const Transaction = require("../models/Transaction");


// get user transactions
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(transactions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get single transaction
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};