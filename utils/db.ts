import { Sequelize } from "sequelize";

const { DB, DB_USER, DB_PASSWORD, HOST, DB_PORT } = process.env;
const config = {
  dialect: "mariadb",
  port: DB_PORT,
  host: HOST
};

export const sequelize = new Sequelize(
  `${config.dialect}://${DB_USER}:${DB_PASSWORD}@${config.host}:${config.port}/${DB}`
);

sequelize.authenticate();
