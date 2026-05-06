const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // owner (who initiated the transaction)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fromAccount: {
      type: String,
      required: true
    },

    toAccount: {
      type: String,
      required: true
    },

    accountName: {
      type: String // recipient name (from name enquiry)
    },

    bankName: {
      type: String
    },

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "NGN"
    },

    type: {
      type: String,
      enum: ["transfer", "deposit", "withdrawal"],
      default: "transfer"
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending"
    },

    // NIBSS transaction Id (TSQ)
    transactionId: {
      type: String
    },

    // optional
    narration: {
      type: String
    },

    // error logging
    failureReason: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);