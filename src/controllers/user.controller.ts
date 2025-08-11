import { Request, Response } from 'express';
import User from '../models/user.model';

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};
