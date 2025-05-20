import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    // server side validations
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // password validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be minimum 6 characters long' });
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email already in use. Please use different one' });
    }

    // create random avatar
    const ids = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${ids}.png`;

    // create user
    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePicture: randomAvatar,
    });

    newUser.password = undefined;

    // TODO: create a user in stream as well
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePicture || '',
      });
      console.log('Stream user created for this user: ', newUser.fullName);
    } catch (error) {
      console.error('Upserting new user failed:', error);
    }
    // generate jwt token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '7d',
      }
    );

    // set jwt token in cookie
    res.cookie('jwt', token, {
      httpOnly: true, // prevent XSS attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict', // prevent CSRF attacks
      secure: process.env.NODE_ENV === 'production',
    });

    // send response
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log('Error in signup controller', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: 'All field is required' });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Email or Password is invalid' });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: 'Email or Password is invalid' });

    // generate jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    });

    // set jwt token in cookie
    res.cookie('jwt', token, {
      httpOnly: true, // prevent XSS attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict', // prevent CSRF attacks
      secure: process.env.NODE_ENV === 'production',
    });
    user.password = undefined;

    return res
      .status(200)
      .json({ message: 'Logged in successfully', user, success: true });
  } catch (error) {}
};

export const logout = async (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({ success: true, message: 'Logout successful' });
};

export const onboard = async (req, res) => {
  const userId = req.user._id;
  const { fullName, bio, nativeLanguae, learningLanguage } = req.body;
};
