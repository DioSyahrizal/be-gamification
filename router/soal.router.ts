import { Router, Request, Response } from "express";
// import multer from "multer";
// import uuid from "uuid";

import { Soal } from "../models/soals";

export const soalRouter = Router();

// const DIR = "./public/";

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (_req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, uuid.v4() + "-" + fileName);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
// });

soalRouter.post("/addsingle", (req: Request, res: Response) => {
  // const encoded = `data:${
  //   req.file.mimetype
  // };base64,${req.file.buffer.toString("base64")}`;
  const {
    question,
    opt1,
    opt2,
    opt3,
    opt4,
    answer,
    level,
    matpel,
    profileImg,
  } = req.body;
  Soal.create({
    question: question,
    opt1: opt1,
    opt2: opt2,
    opt3: opt3,
    opt4: opt4,
    answer: answer,
    level: level,
    matpel: matpel,
    image: profileImg,
  })
    .then((create) => res.status(200).json({ status: "success", data: create }))
    .catch((err) => {
      res.status(500).json({ erorrs: err });
    });
});

soalRouter.post("/add", async (req: Request, res: Response) => {
  const { data } = req.body;
  Soal.bulkCreate([
    {
      question: "Apa pertanyaanya ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Easy",
    },
    {
      question: "Dimana kamu ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Hard",
    },
    {
      question: "Dimana dia ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Hard",
    },
    {
      question: "Dimana semuanya ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Hard",
    },
    {
      question: "Dimana yang lain ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Hard",
    },
  ]).then((soal) => {
    console.dir(soal);
    console.dir(data);
    res.status(200).json({ status: 200, success: "Soal added!" });
  });
});

soalRouter.get("/all", async (req: Request, res: Response) => {
  const { matpel } = req.query;

  if (Object.keys(req.query).length !== 0) {
    Soal.findAll({ where: { matpel: matpel } }).then((soal) =>
      res.status(200).json({ data: soal })
    );
  } else {
    Soal.findAll().then((soal) => {
      res.status(200).json({ status: 200, data: soal });
    });
  }
});

soalRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  Soal.findOne({ where: { id: req.params.id } }).then((soal) => {
    if (soal) {
      Soal.destroy({ where: { id: req.params.id } }).then((deleted) => {
        console.dir(deleted);
        res.status(200).json({ status: 200, success: "Soal deleted!" });
      });
    } else {
      res.status(400).json({ status: 400, errors: "Soal not found" });
    }
  });
});
