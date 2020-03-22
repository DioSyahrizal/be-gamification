import { Router, Request, Response } from "express";
// import { sequelize } from "../utils/db";
import { UserSoal } from "../models/users_soal";
import { Sequelize } from "sequelize";
import { Soal } from "../models/soals";

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
      res.json("false bruh");
    }
  });
});
