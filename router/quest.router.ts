import { Router, Request, Response } from "express";
// import { sequelize } from "../utils/db";
import { UserSoal } from "../models/users_soal";
import { Sequelize } from "sequelize";
import { Soal } from "../models/soals";
import { sequelize } from "../utils/db";
import { triggerSoalBadge } from "../utils/checkBadge";
import { Hasil } from "../models/hasil";
import { addScore } from "../utils/countScore";

export const quizRouter = Router();

quizRouter.post("/generate", async (req: Request, res: Response) => {
  const { id_user } = req.body;
  const matpel = "quest";

  //get isi dari soal yang dimiliki user
  UserSoal.count({
    where: { id_user: id_user, matpel: matpel },
  }).then(async (counter) => {
    if (counter === 0) {
      //Menambahkan soal secara random
      Soal.findAll({
        attributes: ["id", "matpel", "level"],
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

quizRouter.get("/soal/", async (req: Request, res: Response) => {
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

quizRouter.get("/soal/:id", async (req: Request, res: Response) => {
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

quizRouter.put("/correction/", async (req: Request, res: Response) => {
  // FIXME: penyesuaian quest
  const { id, id_soaluser, answer, id_user } = req.body;

  let result;
  Soal.findOne({ where: { id: id } }).then((soal) => {
    if (soal && soal.answer === answer) {
      result = "true";
    } else {
      result = "false";
    }
    UserSoal.update({ result: result }, { where: { id: id_soaluser } })
      .then((_updated) => {
        triggerSoalBadge(id_user); // TODO: change to trigger Quest
        res.status(200).json({ status: "updated" });
      })
      .catch((error) => res.json({ error: error }));
  });
});

quizRouter.post("/score", async (req: Request, res: Response) => {
  // FIXME: Penyesuaian score quest
  const { id_user, matpel } = req.body;
  let multiple: number;

  UserSoal.findAndCountAll({
    where: { id_user: id_user, matpel: matpel, result: true },
  }).then((data) => {
    const score = data.count * multiple;
    Hasil.findAndCountAll({
      where: { id_user: id_user, matpel: matpel },
    }).then((data) => {
      if (data.count === 0) {
        Hasil.create({
          id_user: id_user,

          matpel: matpel,
          nilai: score,
        }).then((_hasil) => res.status(200).json({ score: score }));
        addScore(id_user, score);
        // triggerLevel(id_user, level, matpel); //TODO: Trigger point quest?
      } else {
        res.status(200).json({ status: "Already submitted" });
      }
    });
  });
});

quizRouter.get("/answer", async (req: Request, res: Response) => {
  const { id } = req.query;
  Soal.findOne({ where: { id: id }, attributes: ["answer"] }).then((soal) =>
    res.status(200).json(soal)
  );
});

quizRouter.get("/progress", async (req: Request, res: Response) => {
  // FIXME: Add Progress? Hmm
  const { id_user, matpel } = req.query;

  const result: any = await sequelize
    .query(
      `SELECT SUM(IF(result IS NOT NULL AND level = 'Easy' ,1,0)) as easy,
              SUM(IF(result IS NOT NULL AND level = 'Medium' ,1,0)) as med,
              SUM(IF(result IS NOT NULL AND level = 'Hard' ,1,0)) as hard
               FROM user_get_soal WHERE id_user= :id_user AND matpel= :matpel`,
      {
        replacements: { id_user: id_user, matpel: matpel },
        logging: console.log,
        plain: false,
        raw: true,
      }
    )
    .catch((error) => res.json({ error: error }));
  res.json(result[0][0]);
});
