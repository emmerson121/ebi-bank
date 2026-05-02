const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true
    },

    accountName: {
      type: String,
      required: true
    },

    bankCode: {
      type: String,
      required: true
    },

    bankName: {
      type: String,
      required: true
    },

    balance: {
      type: Number,
      default: 0
    },

    currency: {
      type: String,
      default: "NGN"
    },

    status: {
      type: String,
      enum: ["active", "suspended", "closed"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Account", accountSchema);