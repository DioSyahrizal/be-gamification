import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Bluebird from "bluebird";
import { User, UserAddModel, UserViewModel } from "../models/users";
import uuid from "uuid";

export class UserService {
  private readonly _saltRounds = 12;
  private readonly _jwtsecret = "lalalala";
  private static _user: any;

  static get userAttribute() {
    return ["id", "email"];
  }

  static get user() {
    return UserService._user;
  }

  async register({ email, password }: UserAddModel) {
    User.findOne({ where: { email } }).then((u: any) => {
      if (u !== null) {
        return { status: 400 };
      } else {
        return bcrypt.genSalt(this._saltRounds, (err, salt) => {
          if (err) {
            return console.error("There was an error ", err);
          } else {
            bcrypt.hash(password, salt).then(async hash => {
              await User.create({
                id: uuid.v4(),
                email: email,
                password: hash
              }).then((u: any) => {
                console.dir(u.dataValues);
                return { data: u.dataValues };
              });
            });
          }
        });
      }
    });
  }

  async login({ email }: any) {
    return User.findOne({ where: { email } }).then((u: UserViewModel) => {
      const { id, email } = u!;
      return { token: jwt.sign({ id, email }, this._jwtsecret) };
    });
  }

  verifyToken(token: string) {
    return new Promise((resolve, _reject) => {
      jwt.verify(token, this._jwtsecret, (err, _payload) => {
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
        return;
      });
    }) as Promise<boolean>;
  }

  getUserById(id: string) {
    return User.findById(id, {
      attributes: UserService.userAttribute
    }) as Bluebird<UserViewModel>;
  }
}
