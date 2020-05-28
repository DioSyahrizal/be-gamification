import { Router, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../models/users";
import { UserSoal } from "../models/users_soal";
import { Menu } from "../models/menu";
import { UserControl } from "../models/user_control";

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
  UserControl.findAll({ attributes: { exclude: ["password", "role"] } }).then(
    (user) => {
      res.status(200).json(user);
    }
  );
});

controlRouter.put("/user", async (req: Request, res: Response) => {
  const { id, username, name, email, address, point } = req.body;
  UserControl.update(
    {
      username: username,
      name: name,
      email: email,
      address: address,
      point: point,
    },
    { where: { id: id } }
  ).then((_user) => {
    res.status(200).json({ status: "success" });
  });
});

controlRouter.put("/fis_med/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  Menu.update(
    { fis_med: "open" },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  ).then((_menu) =>
    Menu.findOne({ where: { id: id } }).then((data) =>
      res.status(200).json(data)
    )
  );
});

controlRouter.put("/fis_hard/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  Menu.update(
    { fis_hard: "open" },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  ).then((_menu) =>
    Menu.findOne({ where: { id: id } }).then((data) =>
      res.status(200).json(data)
    )
  );
});

controlRouter.put("/kim_med/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  Menu.update(
    { kim_med: "open" },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  ).then((_menu) =>
    Menu.findOne({ where: { id: id } }).then((data) =>
      res.status(200).json(data)
    )
  );
});

controlRouter.put("/kim_hard/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  Menu.update(
    { kim_hard: "open" },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  ).then((_menu) =>
    Menu.findOne({ where: { id: id } }).then((data) =>
      res.status(200).json(data)
    )
  );
});
