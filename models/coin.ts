import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export class Coin extends Model {
  public id!: string;
  public point!: number;
  public coin!: number;
}

Coin.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    point: Sequelize.BIGINT,
    coin: Sequelize.BIGINT,
  },

  { sequelize, tableName: "users", timestamps: false }
);

// UserSoal.hasMany(Soal, { foreignKey: "id_soal" });
// UserSoal.hasMany(User, { foreignKey: "id_user" });
