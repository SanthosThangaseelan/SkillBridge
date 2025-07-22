const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, phone, language, city, bio, tags } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      language,
      city,
      bio,
      tags,
    });

    await newUser.save();

    req.session.userId = newUser._id;
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong password' });

    req.session.userId = user._id;
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user (session)
router.get("/me", async (req, res) => {
  //console.log("Session on /me:", req.session); // Log it

  if (!req.session.userId) return res.json(null);

  const user = await User.findById(req.session.userId);
  res.json(user);
});


// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
