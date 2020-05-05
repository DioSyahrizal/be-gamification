import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export class ItemUser extends Model {
  public id!: number;
  public id_user!: string;
  public id_item!: number;
  public quantity!: number;
  public spent!: number;
}

ItemUser.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: Sequelize.STRING,
    id_item: Sequelize.NUMBER,
    quantity: Sequelize.BIGINT,
    spent: Sequelize.BIGINT,
  },
  { sequelize, tableName: "user_item", timestamps: false }
);

// UserSoal.hasMany(Soal, { foreignKey: "id_soal" });
// UserSoal.hasMany(User, { foreignKey: "id_user" });
