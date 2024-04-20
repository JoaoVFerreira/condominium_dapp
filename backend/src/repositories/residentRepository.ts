import model from '../models';
import { ResidentModel } from '../models/ResidentModel';
import { ResidentEntity } from '../entities/residentEntity';

export interface IResidentRepository {
  create(data: Partial<ResidentEntity>): Promise<ResidentEntity>;
  update(wallet: string, data: Partial<ResidentEntity>): Promise<ResidentEntity>;
  getOne(wallet: string): Promise<ResidentEntity>;
  delete(wallet: string): Promise<void>;
}

export class ResidentRepository implements IResidentRepository {  
  constructor(private readonly Model: typeof ResidentModel = model.residents) {}

  public async create(data: Partial<ResidentEntity>): Promise<ResidentEntity> {
    data.wallet = data.wallet.toLowerCase()
    const resident = await this.Model.create(data);
    return new ResidentEntity(resident)
  }

  public async update(wallet: string, data: Partial<ResidentEntity>): Promise<ResidentEntity> {
    const resident = await this.Model.findOne({ where: { wallet: wallet.toLowerCase() } });
    const residentUpdated = await resident.update(data);
    return new ResidentEntity(residentUpdated.dataValues);
  }

  public async getOne(wallet: string): Promise<ResidentEntity> {
    const resident = await this.Model.findOne({ where: { wallet: wallet.toLowerCase() } })
    return resident ? new ResidentEntity(resident) : null
  }

  public async delete(wallet: string): Promise<void> {
    await this.Model.destroy({ where: { wallet: wallet.toLowerCase() }})
  }
}
