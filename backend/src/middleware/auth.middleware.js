import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protectedRoute = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: 'Unauthorised - no token provided' });
  } catch (error) {}
};
