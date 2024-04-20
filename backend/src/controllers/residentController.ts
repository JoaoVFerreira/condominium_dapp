import { Request, Response, NextFunction } from 'express';
import { IResidentRepository, ResidentRepository } from '../repositories/residentRepository';
import { StatusCodes } from 'http-status-codes';

export interface IResidentController {
  getResident(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>
  postResident(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>
  patchResident(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>
  deleteResident(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>
}

const repository: IResidentRepository = new ResidentRepository()

export class ResidentController implements IResidentController {
  public async getResident(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const wallet = req.params.wallet;
    const resident = await repository.getOne(wallet);
    if (!resident) return res.status(StatusCodes.NOT_FOUND).json({ message: "Resident not found!" });
    return res.status(StatusCodes.OK).json({
      message: "Resident found with success!",
      response: resident
    })
  }

  public async postResident(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const resident = req.body;
    const response = await repository.create(resident)
    return res.status(StatusCodes.CREATED).json({
      message: "Resident added to the condominium!",
      response
    });
  }

  public async patchResident(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const wallet = req.params.wallet;
    const resident = req.body;
    const residentFound = await repository.getOne(wallet);
    if (!residentFound) return res.status(StatusCodes.NOT_FOUND).json({ message: "Resident not found!" })

    const response = await repository.update(wallet, resident)
    return res.status(StatusCodes.OK).json({
      message: "Resident Updated with success!",
      response
    });
  }

  public async deleteResident(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const wallet = req.params.wallet;
    const resident = await repository.getOne(wallet);
    if (!resident) return res.status(StatusCodes.NOT_FOUND).json({ message: "Resident not found!" })
            
    await repository.delete(wallet)
    return res.status(StatusCodes.OK).json({ message: "Resident removed from the condominium!" })
  }
}
