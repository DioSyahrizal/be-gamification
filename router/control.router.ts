import { Router, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../models/users";
import { UserSoal } from "../models/users_soal";

export const controlRouter = Router();

controlRouter.get("/count", async (_req: Request, res: Response) => {
  User.findAndCountAll({ where: { role: { [Op.not]: "admin" } } }).then(
    (user) => {
      UserSoal.findAndCountAll({ where: { result: { [Op.not]: "" } } }).then(
        (soal) => {
          res
            .status(200)
            .json({ countUser: user.count, countSoal: soal.count });
        }
      );
    }
  );
});

controlRouter.get("/user", async (_req: Request, res: Response) => {
  User.findAll({ attributes: { exclude: ["password", "role"] } }).then(
    (user) => {
      res.status(200).json(user);
    }
  );
});

controlRouter.put("/user", async (req: Request, res: Response) => {
  const { id, username, name, email, address } = req.body;
  User.update({ username, name, email, address }, { where: { id: id } }).then(
    (_user) => {
      res.status(200).json({ status: "success" });
    }
  );
});
