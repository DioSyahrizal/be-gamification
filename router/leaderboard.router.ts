import { Router, Request, Response } from "express";
import { sequelize } from "../utils/db";

export const leadRouter = Router();

leadRouter.get("/all", async (_req: Request, res: Response) => {
  const result: any = await sequelize
    .query(
      "SELECT DISTINCT t1.id_user , u.name, u.username ,(SELECT SUM(nilai) FROM hasil as t2 WHERE t1.id_user = t2.id_user) as total, (SELECT COUNT(id_user) FROM user_badges as b1 WHERE b1.id_user = t1.id_user) as jum_badge FROM hasil as t1 JOIN users as u ON t1.id_user = u.id ORDER BY total DESC",
      {
        logging: console.log,
        plain: false,
        raw: true,
      }
    )
    .catch((error) => res.json({ error: error }));

  res.status(200).json(result[0]);
});

leadRouter.get("/fisika", async (req: Request, res: Response) => {
  const { level } = req.query;
  const result: any = await sequelize
    .query(
      "SELECT u.username, u.name, h.nilai FROM hasil as h JOIN users as u ON h.id_user = u.id WHERE h.matpel='Fisika' AND level= :level ORDER BY h.nilai DESC",
      {
        replacements: { level: level },
        logging: console.log,
        plain: false,
        raw: true,
      }
    )
    .catch((error) => res.json({ error: error }));

  res.status(200).json(result[0]);
});

leadRouter.get("/kimia", async (req: Request, res: Response) => {
  const { level } = req.query;
  const result: any = await sequelize
    .query(
      "SELECT u.username, u.name, h.nilai FROM hasil as h JOIN users as u ON h.id_user = u.id WHERE h.matpel='Kimia' AND level= :level ORDER BY h.nilai DESC",
      {
        replacements: { level: level },
        logging: console.log,
        plain: false,
        raw: true,
      }
    )
    .catch((error) => res.json({ error: error }));

  res.status(200).json(result[0]);
});
