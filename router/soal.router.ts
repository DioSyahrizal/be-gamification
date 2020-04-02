import { Router, Request, Response } from "express";

import { Soal } from "../models/soals";

export const soalRouter = Router();

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
      level: "Easy"
    },
    {
      question: "Dimana kamu ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Hard"
    },
    {
      question: "Dimana dia ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Hard"
    },
    {
      question: "Dimana semuanya ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Hard"
    },
    {
      question: "Dimana yang lain ya?",
      opt1: "Aduh",
      opt2: "Aaa",
      opt3: "Aoksd",
      opt4: "asd3",
      answer: "Aaa",
      level: "Hard"
    }
  ]).then(soal => {
    console.dir(soal);
    console.dir(data);
    res.status(200).json({ status: 200, success: "Soal added!" });
  });
});

soalRouter.get("/", async (_req: Request, res: Response) => {
  Soal.findAll().then(soal => {
    res.status(200).json({ status: 200, data: soal });
  });
});

soalRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  Soal.findOne({ where: { id: req.params.id } }).then(soal => {
    if (soal) {
      Soal.destroy({ where: { id: req.params.id } }).then(deleted => {
        console.dir(deleted);
        res.status(200).json({ status: 200, success: "Soal deleted!" });
      });
    } else {
      res.status(400).json({ status: 400, errors: "Soal not found" });
    }
  });
});
