import { Router, Request, Response } from "express";
import uuid from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator/check";

import { User } from "../models/users";

export const userRouter = Router();

const _saltRounds = 12;
const _jwtsecret = "lalalala";

userRouter.post("/register", async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) res.status(422).json(errors.array());

  const { email, password, username, name, address } = req.body;

  User.findOne({ where: { email } }).then(u => {
    if (u !== null) {
      res.status(400).json({ status: 400, message: "email already taken" });
    } else {
      bcrypt.genSalt(_saltRounds, (err, salt) => {
        if (err) {
          res.status(400).json({ status: 400, message: err.message });
        } else {
          bcrypt.hash(password, salt).then(hash => {
            User.create({
              id: uuid.v4(),
              name,
              username,
              email,
              password: hash,
              address,
              point: 1000
            }).then(u => {
              console.dir(u);
              res.status(200).json({ status: 200, success: true });
            });
          });
        }
      });
    }
  });
});

userRouter.post("/login", (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  }

  const payload = { email: req.body.email, password: req.body.password };

  User.findOne({ where: { email: payload.email } }).then((user: any) => {
    if (user) {
      const { id, email, password } = user;
      bcrypt.compare(payload.password, password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: id,
            email: email
          };
          jwt.sign(payload, _jwtsecret, (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                token: `${token}`
              });
            }
          });
        } else {
          res.status(400).json({ errors: "email or password is invalid" });
        }
      });
    } else {
      res.status(400).json({ errors: "email or password is invalid" });
    }
  });
});

userRouter.get("/user/:id", (req: Request, res: Response) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] }
  }).then(user => {
    if (user) {
      res.json({ data: user });
    } else {
      res.json({ error: "User not found!" });
    }
  });
});
