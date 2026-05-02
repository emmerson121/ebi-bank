const express = require("express");
const router = express.Router();

const {
  getUserTransactions,
  getTransactionById
} = require("../controllers/transactionController");

const { protect } = require("../middleware/authMiddleware");


// history
router.get("/", protect, getUserTransactions);

// single transaction
router.get("/:id", protect, getTransactionById);


module.exports = router;