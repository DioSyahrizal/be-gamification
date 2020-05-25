import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export class Badge extends Model {
  public id!: number;
  public name_badge!: string;
  public description!: string;
}

Badge.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_badge: Sequelize.STRING,
    description: Sequelize.TEXT,
  },
  { sequelize, tableName: "badges", timestamps: false }
);

// UserSoal.hasMany(Soal, { foreignKey: "id_soal" });
// UserSoal.hasMany(User, { foreignKey: "id_user" });
