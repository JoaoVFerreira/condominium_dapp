import { Model } from 'sequelize';

export class ResidentModel extends Model {
  declare id: number;
  declare wallet: string;
  declare phone: string;
  declare profile: number;
  declare email: string;
  declare name: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  static notHistory: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  ResidentModel.init(
    {
      wallet: DataTypes.STRING,
      profile: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'residents'
    }
  );

  ResidentModel.notHistory = true;

  return ResidentModel;
};