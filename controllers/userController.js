const User = require("../models/User");


// 👤 GET PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🪪 SUBMIT KYC
exports.submitKYC = async (req, res) => {
  try {
    const { kycType, kycID, dob } = req.body;

    const user = await User.findById(req.user.id);

    user.kycType = kycType;
    user.kycID = kycID;
    user.dob = dob;
    user.isKycVerified = true; // (you can validate with NIBSS later)

    await user.save();

    res.json({
      message: "KYC submitted successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};