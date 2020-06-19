import { Router, Request, Response } from "express";
// import { sequelize } from "../utils/db";
import { UserSoal } from "../models/users_soal";
import { Sequelize } from "sequelize";
import { Soal } from "../models/soals";
import { sequelize } from "../utils/db";

import { addCoin } from "../utils/countScore";

export const questRouter = Router();

questRouter.post("/generate", async (req: Request, res: Response) => {
  const { id_user } = req.body;
  const matpel = "quest";

  //get isi dari soal yang dimiliki user
  UserSoal.count({
    where: { id_user: id_user, matpel: matpel },
  }).then(async (counter) => {
    if (counter === 0) {
      //Menambahkan soal secara random
      Soal.findAll({
        attributes: ["id", "matpel"],
        where: { matpel: matpel },
        order: [Sequelize.fn("rand")],
        limit: 5,
      }).then(async (soalUser) => {
        //desctructuring
        const resObj = soalUser.map((soal) => {
          return Object.assign(
            {},
            {
              id_user: id_user,
              id_soal: soal.id,
              matpel: soal.matpel,
            }
          );
        });

        //bulk create ke soal_user
        UserSoal.bulkCreate(resObj).then((soal) => {
          res.status(200).json({ status: "Success", data: soal });
        });
      });
    } else {
      res.json({ status: "Already add!" });
    }
  });
});

questRouter.get("/soal/", async (req: Request, res: Response) => {
  const { id_user } = req.query;
  const matpel = "quest";
  const result: any = await sequelize
    .query(
      `SELECT s.id, s.question, s.opt1, s.opt2, s.opt3, s.opt4 , s.level, s.image, s.matpel, g.id as id_soaluser, g.result FROM soal as s JOIN user_get_soal as g
      ON g.id_soal = s.id where g.id_user= :id AND s.matpel = :matpel`,
      {
        replacements: { id: id_user, matpel: matpel },
        logging: console.log,
        plain: false,
        raw: true,
      }
    )
    .catch((_error) => res.json({ error: "Need a request body!" }));
  res.json({ data: result[0] });
});

questRouter.get("/soal/:id", async (req: Request, res: Response) => {
  const { id_user } = req.query;
  const matpel = "quest";
  const { id } = req.params;
  const result: any = await sequelize
    .query(
      `SELECT s.id, s.question, s.opt1, s.opt2, s.opt3, s.opt4 , s.level, s.image, s.matpel, g.id as id_soaluser, g.result FROM soal as s JOIN user_get_soal as g
      ON g.id_soal = s.id where g.id_user= :id AND s.matpel = :matpel`,
      {
        replacements: { id: id_user, matpel: matpel },
        logging: console.log,
        plain: false,
        raw: true,
      }
    )
    .catch((_error) => res.json({ error: "Need a request body!" }));
  res.json({ data: result[0][id] });
});

questRouter.put("/correction", async (req: Request, res: Response) => {
  const { id, id_soaluser, answer, id_user } = req.body;

  let result: string;
  Soal.findOne({ where: { id: id } }).then((soal) => {
    if (soal && soal.answer === answer) {
      result = "true";
    } else {
      result = "false";
    }
    UserSoal.update({ result: result }, { where: { id: id_soaluser } })
      .then((_updated) => {
        const score = result === "true" ? 600 : 0;
        addCoin(id_user, score);
        res.status(200).json({ hasil: result });
      })
      .catch((error) => res.json({ error: error }));
  });
});

questRouter.get("/answer", async (req: Request, res: Response) => {
  const { id } = req.query;
  Soal.findOne({ where: { id: id }, attributes: ["answer"] }).then((soal) =>
    res.status(200).json(soal)
  );
});

questRouter.get("/progress", async (req: Request, res: Response) => {
  // DONE: Add Progress? Hmm
  const { id_user } = req.query;

  const result: any = await sequelize
    .query(
      `SELECT SUM(IF(result IS NOT NULL AND matpel = 'quest' ,1,0)) as quest
               FROM user_get_soal WHERE id_user= :id_user`,
      {
        replacements: { id_user: id_user },
        logging: console.log,
        plain: false,
        raw: true,
      }
    )
    .catch((error) => res.json({ error: error }));
  res.json(result[0][0]);
});

//ADMIN PAGE

questRouter.post("/add", (req: Request, res: Response) => {
  const { question, opt1, opt2, opt3, opt4, answer, profileImg } = req.body;
  Soal.create({
    question: question,
    opt1: opt1,
    opt2: opt2,
    opt3: opt3,
    opt4: opt4,
    answer: answer,
    matpel: "quest",
    image: profileImg,
  })
    .then((create) => res.status(200).json({ status: "success", data: create }))
    .catch((err) => {
      res.status(500).json({ erorrs: err });
    });
});

questRouter.get("/all", async (_req: Request, res: Response) => {
  Soal.findAll({ where: { matpel: "quest" } }).then((soal) => {
    res.status(200).json({ status: 200, data: soal });
  });
});

questRouter.get("/menu", async (_req: Request, res: Response) => {
  // TODO: add condition open Quest Menu
  res.status(200).json({ status: 200, data: "open" });
});
