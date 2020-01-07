import mysql from "mysql";

const connection = mysql.connection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "db_gamifikasi"
});

connection.connect((err: Error) => {
  if (err) {
    throw err;
  }
});

export default connection;
