import { signAccessToken, signRefreshToken } from './jwt';
import { setAuthCookies } from './cookies';
import dbConnect from './db/connect';
import User from '../models/User';

export async function loginUser(email: string, password: string) {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const accessToken = signAccessToken({ userId: user._id });
  const refreshToken = signRefreshToken({ userId: user._id });

  setAuthCookies(accessToken, refreshToken);

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  };
}
