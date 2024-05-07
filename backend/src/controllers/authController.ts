import { Request, Response, NextFunction } from 'express';
import { ResidentRepository } from '../repositories/residentRepository';
import { StatusCodes } from 'http-status-codes';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

export type LoginData = {
  timestamp: number;
  wallet: string;
  secret: string;
}

const JWT_SECRET = `${process.env.JWT_SECRET}`;
const JWT_EXPIRES = parseInt(`${process.env.JWT_EXPIRES}`);

export async function doLogin(req: Request, res: Response, next: NextFunction) {
  const data = req.body as LoginData;
  if (data?.timestamp < (Date.now() - (30 * 1000))) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Timestamp too old." });
  }
  const message = `Authenticating to Condominium. Timestamp: ${data?.timestamp}`;
  const signer = ethers.verifyMessage(message, data.secret);

  if (signer.toUpperCase() === data?.wallet?.toUpperCase()) {
    const repository = new ResidentRepository()
    const resident = await repository.getOne(data.wallet.toLowerCase());
    if (!resident) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Resident not found." });
    const token = jwt.sign({ ...data, profile: resident.profile }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES
    })
    return res.json({ token });
  }

  return res.status(StatusCodes.UNAUTHORIZED).json({ message: `Wallet and secret doesn't match.` });
}
