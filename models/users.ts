import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export interface UserAddModel {
  email: string;
  password: string;
}

export interface UserViewModel {
  id: string;
  email: string;
  password: string;
}

export class User extends Model {
  public id!: string;
  public username!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public point!: number;
  public coin!: number;
  public role!: string;
  public questcounter!: number;
  public sekolah!: string;
  public nohp!: string;
}

User.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    address: Sequelize.TEXT,
    point: Sequelize.BIGINT,
    coin: Sequelize.BIGINT,
    role: {
      type: Sequelize.ENUM,
      values: ["user", "admin"],
    },
    questcounter: Sequelize.BIGINT,
    sekolah: Sequelize.STRING,
    nohp: Sequelize.STRING,
  },

  { sequelize, tableName: "users", timestamps: false }
);

// User.belongsToMany(Soal, {
//   through: UserSoal,
//   foreignKey: "id_user",
//   otherKey: "id_soal"
// });
