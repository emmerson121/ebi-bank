const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  submitKYC
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");


// user profile
router.get("/profile", protect, getUserProfile);

// submit KYC (BVN / NIN)
router.post("/kyc", protect, submitKYC);


module.exports = router;