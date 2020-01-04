const { Router } = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const crypto = require("crypto");
const router = Router();

router.post(
  "/register",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data"
      });
    }

    const { email, password } = req.body;
    User.findOne({ email })
      .then(possibleUser => {
        if (possibleUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = crypto
          .createHash("sha256")
          .update(password)
          .digest("hex");
        const user = new User({ email, password: hashedPassword });

        return user.save();
      })
      .then(() => {
        res.status(201).json({ message: "User created" });
      })
      .catch(e => console.log("Error occured"));
  }
);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .normalizeEmail(),
    check("password").exists()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data"
      });
    }

    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
      if (!user) {
        return res.status(400).json({ message: "Wrong email or password" });
      }

      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      if (user.password !== hashedPassword) {
        return res.status(400).json({ message: "Wrong email or password" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.NOTES_APP_PRIVATE_KEY
      );

      res.json({ userToken: token, userId: user.id });
    });
  }
);

module.exports = router;
