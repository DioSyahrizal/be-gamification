import { Router, Request, Response } from "express";
import uuid from "uuid";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";

import { UserService } from "../services/user.service";
import { User } from "../models/users";

export const userRouter = Router();
const userService = new UserService();

userRouter.post("/register", async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) res.status(422).json(errors.array());

  const { email, password } = req.body;
  // const user = await userService.register(payload);
  // console.dir(user);
  User.findOne({ where: { email } }).then((u: any) => {
    if (u !== null) {
      res.status(400).json({ status: 400, message: "email already taken" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          res.status(400).json({ status: 400, message: err.message });
        } else {
          bcrypt.hash(password, salt).then(hash => {
            User.create({
              id: uuid.v4(),
              email: email,
              password: hash
            }).then((u: any) => {
              console.dir(u.dataValues);
              res.status(200).json({ data: u.dataValues });
            });
          });
        }
      });
    }
  });
});

userRouter.post("/login", (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = { email: req.body.email };
  const token = userService.login(payload);

  return token.then(t => res.json(t));
});
