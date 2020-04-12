import { User } from "../models/users";

export const addScore = (id_user: string, score: number) => {
  User.findOne({ where: { id: id_user } }).then((data) => {
    const updatePoint = data && data.point + score;
    User.update(
      { point: updatePoint },
      { where: { id: id_user } }
    ).then((data) => console.dir(data));
  });
};
