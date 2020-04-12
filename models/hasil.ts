import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export class Hasil extends Model {
  public id!: number;
  public id_user!: string;
  public level!: string;
  public matpel!: string;
  public nilai!: number;
}

Hasil.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: Sequelize.STRING,
    level: Sequelize.STRING,
    matpel: Sequelize.STRING,
    nilai: Sequelize.BIGINT,
  },
  { sequelize, tableName: "hasil", timestamps: false }
);

// UserSoal.hasMany(Soal, { foreignKey: "id_soal" });
// UserSoal.hasMany(User, { foreignKey: "id_user" });
