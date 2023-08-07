const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const signUP = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

const login = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ userDetails: user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

module.exports = {
  signUP,
  login,
  userDetails,
};
