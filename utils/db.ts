const Sequelize = require("sequelize");

export const sequelize = new Sequelize(process.env.DB, "root", "1234", {
  dialect: "mysql",
  port: 3306,
  host: "localhost"
});

sequelize.authenticate();
