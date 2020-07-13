import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export class UserControl extends Model {
  public id!: string;
  public username!: string;
  public name!: string;
  public email!: string;
  public address!: string;
  public point!: number;
  public coin!: number;
  public nohp!: string;
  public fis_med!: string;
  public fis_hard!: string;
  public kim_med!: string;
  public kim_hard!: string;
}

UserControl.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.TEXT,
    point: Sequelize.BIGINT,
    coin: Sequelize.BIGINT,
    nohp: Sequelize.STRING,
    fis_med: {
      type: Sequelize.ENUM,
      values: ["lock", "open"],
    },
    fis_hard: {
      type: Sequelize.ENUM,
      values: ["lock", "open"],
    },
    kim_med: {
      type: Sequelize.ENUM,
      values: ["lock", "open"],
    },
    kim_hard: {
      type: Sequelize.ENUM,
      values: ["lock", "open"],
    },
  },
  { sequelize, tableName: "users", timestamps: false }
);

// User.belongsToMany(Soal, {
//   through: UserSoal,
//   foreignKey: "id_user",
//   otherKey: "id_soal"
// });
