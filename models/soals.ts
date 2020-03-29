import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";
import { UserSoal } from "./users_soal";

export class Soal extends Model {
  public id!: number;
  public question!: string;
  public opt1!: string;
  public opt2!: string;
  public opt3!: string;
  public opt4!: string;
  public answer!: string;
  public level!: string;
}

Soal.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
    question: Sequelize.TEXT,
    opt1: Sequelize.STRING,
    opt2: Sequelize.TEXT,
    opt3: Sequelize.TEXT,
    opt4: Sequelize.TEXT,
    answer: Sequelize.TEXT,
    level: Sequelize.STRING
  },
  { sequelize, tableName: "soal", timestamps: false }
);

Soal.hasMany(UserSoal, { foreignKey: "id" });

// Soal.belongsToMany(User, {
//   through: UserSoal,
//   foreignKey: "id_soal",
//   otherKey: " id_user"
// });
