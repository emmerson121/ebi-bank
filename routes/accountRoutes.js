const express = require("express");
const router = express.Router();

const {
  createBankAccount,
  getBalance,
  nameEnquiry,
  transferFunds
} = require("../controllers/accountController");

// const { protect } = require("../middleware/authMiddleware");


// create account
router.post("/create", createBankAccount);

router.get("/balance/:accountNumber", getBalance);

// name enquiry
router.get("/name-enquiry/:accountNumber", nameEnquiry);

// transfer
router.post("/transfer", transferFunds);


module.exports = router;