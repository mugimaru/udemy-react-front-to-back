const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      date: user.date,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route       POST api/auth
// @desc        AUth user & get token
// @access      Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      jwt.sign(
        { user: { id: user.id } },
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
