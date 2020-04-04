import { Router, Request, Response } from "express";
// import { sequelize } from "../utils/db";
import { UserSoal } from "../models/users_soal";
import { Sequelize } from "sequelize";
import { Soal } from "../models/soals";
import { sequelize } from "../utils/db";

export const quizRouter = Router();

quizRouter.post("/easy", async (req: Request, res: Response) => {
  const { id_user } = req.body;

  //get isi dari soal yang dimiliki user
  UserSoal.count({ where: { id_user: id_user } }).then(async counter => {
    if (counter === 0) {
      //Menambahkan soal secara random
      Soal.findAll({
        attributes: ["id"],
        where: { level: "Easy" },
        order: [Sequelize.fn("rand")],
        limit: 5
      }).then(async soalUser => {
        //desctructuring
        const resObj = soalUser.map(soal => {
          return Object.assign({}, { id_user: id_user, id_soal: soal.id });
        });
        //bulk create ke soal_user
        UserSoal.bulkCreate(resObj).then(soal => {
          res.status(200).json({ status: "Success", data: soal });
        });
      });
    } else {
      res.json({ status: "Already add!" });
    }
  });
});

quizRouter.get("/easy", async (req: Request, res: Response) => {
  const { id_user } = req.body;
  const result: any = await sequelize
    .query(
      `SELECT s.*, g.id as id_soaluser, g.result FROM soal as s JOIN user_get_soal as g ON g.id_soal = s.id where g.id_user= :id AND s.level = :level`,
      {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        replacements: { id: id_user, level: "Easy" },
        logging: console.log,
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,
        // Set this to true if you don't have a model definition for your query.
        raw: true
      }
    )
    .catch(_error => res.json({ error: "Need a request body!" }));
  res.json({ data: result[0] });
});

quizRouter.put("/correction/", async (req: Request, res: Response) => {
  const { id, result } = req.body;
  UserSoal.update({ result: result }, { where: { id: id } })
    .then(_updated => res.status(200).json({ status: "updated" }))
    .catch(error => res.json({ error: error }));
});
