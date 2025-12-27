const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const validateEmail = require('../validate/validata');
const { generateAccessToken, generateRefreshToken } = require('../jwt/jwt');
const { sendEmail } = require('../utils/node');
const jwt = require('jsonwebtoken');

const registerContrller = async (req, res) => {
  try {
    const { username, email, phone, password, confriompassword } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'username is Required' });
    }

    const Exitusername = await User.findOne({ username });

    if (Exitusername) {
      return res.status(400).json({
        message:
          'Exitusername alredy Exit pliese new Exitusername and try again',
      });
    }

    if (!email) {
      return res.status(400).json({ message: 'email is Required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json('pliese enter your valid email');
    }

    const exitEmail = await User.findOne({ email });

    if (exitEmail) {
      return res
        .status(400)
        .json({ message: 'Email alredy Exit pliese new email and try again' });
    }

    if (!phone) {
      return res.status(400).json({ message: 'phone is Required' });
    }

    const exitPhone = await User.findOne({ phone });

    if (exitPhone) {
      return res.status(400).json({
        message: 'exitPhone alredy Exit pliese new exitPhone and try again',
      });
    }

    if (!password) {
      return res.status(400).json({ message: 'password is Required' });
    }

    if (!confriompassword) {
      return res.status(400).json({ message: 'confriompassword is Required' });
    }

    if (password !== confriompassword) {
      return res.status(400).json({ message: 'password not match' });
    }

    const haspassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      phone,
      password: haspassword,
    });

    await newUser.save();
    res.status(200).json({
      message: 'user create sucessfully',
      newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'internal server error',
      err: err.message,
    });
  }

  res.status(200).json('i am register controller');
};

const loginController = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId) {
      return res
        .status(400)
        .json({ Message: 'username or mobile number or email requried' });
    }

    const user = await User.findOne({
      $or: [{ username: loginId }, { phone: loginId }, { email: loginId }],
    });

    if (!user) {
      return res
        .status(400)
        .json({ Message: 'এই নামে কোনো ইউজার এর তথ্যা পাওয়া যায়নি' });
    }
    const comPirePassword = await bcrypt.compare(password, user.password);

    if (!comPirePassword) {
      return res.status(400).json('message password not match');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userData = user.toObject();
    delete userData.password; // password hide

    res.status(200).json({
      message: 'Login successful',
      user: userData,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
      err: err.message,
    });
  }
};

const refreshTokenController = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    res.json({ accessToken });
  });
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found with this email' });
  }

  const resetToken = jwt.sign(
    { id: user._id },
    process.env.RESET_PASSWORD_SECRET,
    { expiresIn: '1h' }
  );
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const html = `
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
  `;
  await sendEmail(email, 'Password Reset Request', html);

  res.status(200).json({
    message: 'Password reset link has been sent to your email',
  });
};

const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: 'Token and new password are required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const userId = decoded.id;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  registerContrller,
  forgotPasswordController,
  loginController,
  refreshTokenController,
  resetPasswordController,
};
