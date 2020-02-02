import Sequelize from "sequelize";
import { sequelize } from "../utils/db";

export interface UserAddModel {
  email: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserViewModel {
  id: string;
  email: string;
}

export const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING
  },
  { timestamps: false }
);
