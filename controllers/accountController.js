const Transaction = require("../models/Transaction");
const User = require("../models/User");
const nibss = require("../services/nibbs");

exports.transferFunds = async (req, res) => {
  try {
    const { to, amount, narration } = req.body;

    const user = await User.findById(req.user.id);

    // Step 1: Name enquiry (recommended)
    const nameCheck = await nibss.nameEnquiry(to);

    const accountName = nameCheck.data.accountName;
    const bankName = nameCheck.data.bankName;

    // Step 2: Create pending transaction
    const transaction = await Transaction.create({
      user: user._id,
      fromAccount: user.accountNumber,
      toAccount: to,
      accountName,
      bankName,
      amount,
      narration,
      status: "pending"
    });

    try {
      // Step 3: Call NIBSS Transfer
      const response = await nibss.transfer({
        from: user.accountNumber,
        to,
        amount
      });

      const data = response.data;

      // Step 4: Update Success
      transaction.status = "success";
      transaction.transactionId = data.transactionId;

      await transaction.save();

      res.json({
        message: "Transfer successful",
        transaction
      });

    } catch (err) {
      // Stop 5: Update Failure
      transaction.status = "failed";
      transaction.failureReason =
        err.response?.data?.message || err.message;

      await transaction.save();

      return res.status(400).json({
        message: "Transfer failed",
        error: transaction.failureReason
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};