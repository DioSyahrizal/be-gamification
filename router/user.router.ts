import { Router, Request, Response } from "express";
import { validationResult } from "express-validator/check";
import { UserService } from "../services/user.service";

export const userRouter = Router();
const userService = new UserService();

userRouter.post("/register", async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = { email: req.body.email, password: req.body.password };
  const user = userService.register(payload);
  return res.json(JSON.stringify(user));
});

userRouter.post("/login", (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = { email: req.body.email };
  const token = userService.login(payload);

  return token.then(t => res.json(t));
});
