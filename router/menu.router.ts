import { Router, Request, Response } from "express";
import { Menu } from "../models/menu";

export const menuRouter = Router();

menuRouter.get("/:id", async (req: Request, res: Response) => {
  const id_user = req.body.params;
  Menu.findAll({ where: id_user }).then(data => res.json({ data: data }));
});
