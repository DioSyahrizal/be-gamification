import Sequelize, { Model } from "sequelize";
import { sequelize } from "../utils/db";

export class Menu extends Model {
  public fis_med!: string;
  public fis_hard!: string;
  public kim_med!: string;
  public kim_hard!: string;
}

Menu.init(
  {
    fis_med: {
      type: Sequelize.ENUM,
      values: ["lock", "open"]
    },
    fis_hard: {
      type: Sequelize.ENUM,
      values: ["lock", "open"]
    },
    kim_med: {
      type: Sequelize.ENUM,
      values: ["lock", "open"]
    },
    kim_hard: {
      type: Sequelize.ENUM,
      values: ["lock", "open"]
    }
  },
  { sequelize, tableName: "users", timestamps: false }
);

// UserSoal.hasMany(Soal, { foreignKey: "id_soal" });
// UserSoal.hasMany(User, { foreignKey: "id_user" });
