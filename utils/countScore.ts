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

export const addCoin = (id_user: string, score: number) => {
  User.findOne({ where: { id: id_user } }).then((data) => {
    const updateCoin = data && data.coin + score;
    User.update({ coin: updateCoin }, { where: { id: id_user } }).then((data) =>
      console.dir(data)
    );
  });
};
