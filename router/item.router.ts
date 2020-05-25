import { Router, Request, Response } from "express";
import { ItemUser } from "../models/item_user";
import { User } from "../models/users";
import { triggerItem } from "../utils/checkBadge";

export const itemRouter = Router();

itemRouter.get("/kunci/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  ItemUser.findOne({ where: { id_user: id } }).then((item) => {
    res.status(200).json(item);
  });
});

itemRouter.put("/buykunci", async (req: Request, res: Response) => {
  const { id_user } = req.body;
  const harga = 450;
  User.findOne({ where: { id: id_user } }).then((user) => {
    if (user) {
      let balance: number = user.point - harga;
      if (balance >= 0) {
        User.update({ point: balance }, { where: { id: id_user } }).then(
          (_user) => {
            ItemUser.findOne({ where: { id_user: id_user } }).then((item) => {
              if (item) {
                let count = item.quantity + 1;
                ItemUser.update(
                  { quantity: count },
                  { where: { id_user: id_user } }
                );
                res.status(200).json({ status: "Success Buy!" });
              }
            });
          }
        );
      } else {
        res.status(422).json({ status: "Coin tidak cukup!" });
      }
    }
  });
});

itemRouter.put("/use", async (req: Request, res: Response) => {
  const { id_user } = req.body;
  ItemUser.findOne({ where: { id_user: id_user } }).then((item) => {
    if (item) {
      let newQuantity = item.quantity - 1;
      let newSpent = item.spent + 1;
      if (newQuantity >= 0) {
        ItemUser.update(
          { quantity: newQuantity, spent: newSpent },
          { where: { id_user: id_user } }
        ).then((_item) => {
          triggerItem(id_user);
          res.status(200).json({ status: "Item Used!" });
        });
      } else {
        res.status(422).json({ status: "Item habis!" });
      }
    }
  });
});
