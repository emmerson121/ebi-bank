const User = require("../models/User");
const jwt = require("jsonwebtoken");



// generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};


// register user
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user),
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};