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
  const { id_user, currency } = req.body;
  let coinSpent: number;
  let diamondSpent: number;
  switch (diff) {
    case "medium":
      coinSpent = 1000;
      diamondSpent = 300;
      break;

    case "hard":
      coinSpent = 2000;
      diamondSpent = 600;
      break;

    default:
      coinSpent = 0;
      diamondSpent = 0;
      break;
  }

  if (currency === "point") {
    Coin.findOne({ where: { id: id_user } }).then((data) => {
      const point_user = data ? data.point : 0;
      const point = point_user - coinSpent;
      if (point >= 0) {
        if (diff === "medium") {
          Coin.update({ point: point }, { where: { id: id_user } }).then(
            (_data) =>
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
          Coin.update({ point: point }, { where: { id: id_user } }).then(
            (_data) =>
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
  }
  // beli pakai diamond
  else if (currency === "diamond") {
    Coin.findOne({ where: { id: id_user } }).then((data) => {
      const diamond_user = data ? data.coin : 0;
      const diamond = diamond_user - diamondSpent;

      if (diamond >= 0) {
        if (diff === "medium") {
          Coin.update({ coin: diamond }, { where: { id: id_user } }).then(
            (_data) =>
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
          Coin.update({ coin: diamond }, { where: { id: id_user } }).then(
            (_data) =>
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
        res.status(422).json({ status: "Diamond tidak cukup!" });
      }
    });
  }
});

menuRouter.put("/unlock/kimia/:diff", async (req: Request, res: Response) => {
  const { diff } = req.params;
  const { id_user, currency } = req.body;
  let coinSpent: number;
  let diamondSpent: number;
  switch (diff) {
    case "medium":
      coinSpent = 1000;
      diamondSpent = 300;
      break;

    case "hard":
      coinSpent = 2000;
      diamondSpent = 600;
      break;

    default:
      coinSpent = 0;
      diamondSpent = 0;
      break;
  }

  if (currency === "point") {
    Coin.findOne({ where: { id: id_user } }).then((data) => {
      const point_user = data ? data.point : 0;
      const point = point_user - coinSpent;
      if (point >= 0) {
        if (diff === "medium") {
          Coin.update({ point: point }, { where: { id: id_user } }).then(
            (_data) =>
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
          Coin.update({ point: point }, { where: { id: id_user } }).then(
            (_data) =>
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
  }
  // beli pakai diamond
  else if (currency === "diamond") {
    Coin.findOne({ where: { id: id_user } }).then((data) => {
      const diamond_user = data ? data.coin : 0;
      const diamond = diamond_user - diamondSpent;

      if (diamond >= 0) {
        if (diff === "medium") {
          Coin.update({ coin: diamond }, { where: { id: id_user } }).then(
            (_data) =>
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
          Coin.update({ coin: diamond }, { where: { id: id_user } }).then(
            (_data) =>
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
        res.status(422).json({ status: "Diamond tidak cukup!" });
      }
    });
  }
});
