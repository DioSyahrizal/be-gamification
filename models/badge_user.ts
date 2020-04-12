import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export class BadgeUser extends Model {
  public id!: number;
  public id_user!: string;
  public id_badge!: number;
}

BadgeUser.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: Sequelize.TEXT,
    id_badge: Sequelize.NUMBER,
  },
  { sequelize, tableName: "user_badges", timestamps: false }
);

// UserSoal.hasMany(Soal, { foreignKey: "id_soal" });
// UserSoal.hasMany(User, { foreignKey: "id_user" });
