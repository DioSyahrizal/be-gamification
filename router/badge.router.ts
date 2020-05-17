import { Router, Request, Response } from "express";
import { sequelize } from "../utils/db";

export const badgeRouter = Router();

badgeRouter.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const result: any = await sequelize
    .query(
      "SELECT b.* FROM user_badges as u JOIN badges as b ON u.id_badge = b.id WHERE u.id_user = :id",
      {
        replacements: { id: id },
        logging: console.log,
        plain: false,
        raw: true,
      }
    )
    .catch((error) => res.json({ error: error }));

  res.status(200).json(result[0]);
});
