import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export class UserSoal extends Model {
  public id!: number;
  public id_user!: string;
  public id_soal!: string;
  public result!: string;
}

UserSoal.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: Sequelize.TEXT,
    id_soal: Sequelize.STRING,
    result: Sequelize.TEXT
  },
  { sequelize, tableName: "user_get_soal", timestamps: false }
);

// UserSoal.hasMany(Soal, { foreignKey: "id_soal" });
// UserSoal.hasMany(User, { foreignKey: "id_user" });
