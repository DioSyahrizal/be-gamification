import { Router, Request, Response } from "express";
import { Menu } from "../models/menu";

import { Coin } from "../models/coin";

export const menuRouter = Router();

menuRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  Menu.findOne({ where: { id: id } }).then((data) => res.json(data));
});

menuRouter.put("/unlock/fisika/:diff", async (req: Request, res: Response) => {
  const { diff } = req.params;
  const { id_user } = req.body;
  let coinSpent: number;
  switch (diff) {
    case "medium":
      coinSpent = 1000;
      break;

    case "hard":
      coinSpent = 2000;
      break;

    default:
      coinSpent = 0;
      break;
  }

  Coin.findOne({ where: { id: id_user } }).then((data) => {
    const coin_user = data ? data.point : 0;
    const coin = coin_user - coinSpent;
    if (coin >= 0) {
      if (diff === "medium") {
        Coin.update({ point: coin }, { where: { id: id_user } }).then((_data) =>
          Menu.update(
            { fis_med: "open" },
            {
              where: {
                id: id_user,
              },
              returning: true,
            }
          ).then((_menu) =>
            Menu.findOne({ where: { id: id_user } }).then((data) =>
              res.status(200).json(data)
            )
          )
        );
      } else {
        Coin.update({ point: coin }, { where: { id: id_user } }).then((_data) =>
          Menu.update(
            { fis_hard: "open" },
            {
              where: {
                id: id_user,
              },
            }
          ).then((_menu) =>
            Menu.findOne({ where: { id: id_user } }).then((data) =>
              res.status(200).json(data)
            )
          )
        );
      }
    } else {
      res.status(422).json({ status: "Coin tidak cukup!" });
    }
  });
});

menuRouter.put("/unlock/kimia/:diff", async (req: Request, res: Response) => {
  const { diff } = req.params;
  const { id_user } = req.body;
  let coinSpent: number;
  switch (diff) {
    case "medium":
      coinSpent = 1000;
      break;

    case "hard":
      coinSpent = 2000;
      break;

    default:
      coinSpent = 0;
      break;
  }

  Coin.findOne({ where: { id: id_user } }).then((data) => {
    const coin_user = data ? data.point : 0;
    const coin = coin_user - coinSpent;
    if (coin >= 0) {
      if (diff === "medium") {
        Coin.update({ point: coin }, { where: { id: id_user } }).then((_data) =>
          Menu.update(
            { kim_med: "open" },
            {
              where: {
                id: id_user,
              },
              returning: true,
            }
          ).then((_menu) =>
            Menu.findOne({ where: { id: id_user } }).then((data) =>
              res.status(200).json(data)
            )
          )
        );
      } else {
        Coin.update({ point: coin }, { where: { id: id_user } }).then((_data) =>
          Menu.update(
            { kim_hard: "open" },
            {
              where: {
                id: id_user,
              },
            }
          ).then((_menu) =>
            Menu.findOne({ where: { id: id_user } }).then((data) =>
              res.status(200).json(data)
            )
          )
        );
      }
    } else {
      res.status(422).json({ status: "Coin tidak cukup!" });
    }
  });
});
