import { Sequelize } from "sequelize";

const { DB, DB_USER, DB_PASSWORD } = process.env;
const config = {
  dialect: "mariadb",
  port: 3306,
  host: "localhost"
};

export const sequelize = new Sequelize(
  `${config.dialect}://${DB_USER}:${DB_PASSWORD}@${config.host}:${config.port}/${DB}`
);

sequelize.authenticate();
