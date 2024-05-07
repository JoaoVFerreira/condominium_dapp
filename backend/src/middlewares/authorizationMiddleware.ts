import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Profile } from '../entities/residentEntity';
import { LoginData } from '../controllers/authController';

export function onlyManager(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.token) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }

  const loginData = res.locals.token as LoginData & { profile: Profile };
  if (loginData.profile === Profile.MANAGER) {
    return next();
  } else {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
}

export function onlyCounselor(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.token) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }

  const loginData = res.locals.token as LoginData & { profile: Profile };
  if (loginData.profile !== Profile.RESIDENT) {
    return next();
  } else {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
}
