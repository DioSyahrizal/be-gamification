import { UserSoal } from "../models/users_soal";
import { pusher } from "..";
import { BadgeUser } from "../models/badge_user";

export const triggerSoalBadge = (id_user: string) => {
  //badge jawaban benar 1
  BadgeUser.findAll({ where: { id_user: id_user, id_badge: 1 } }).then(
    (badge) => {
      if (badge.length === 0) {
        UserSoal.findAll({ where: { id_user: id_user, result: "true" } }).then(
          (user) => {
            if (user.length === 3) {
              BadgeUser.create({ id_user: id_user, id_badge: 1 });
              pusher.trigger("badge", "triggerBadge", {
                message: "Learning To Walk",
              });
            }
          }
        );
      }
    }
  );

  BadgeUser.findAll({ where: { id_user: id_user, id_badge: 2 } }).then(
    (badge) => {
      if (badge.length === 0) {
        UserSoal.findAll({ where: { id_user: id_user, result: "true" } }).then(
          (user) => {
            if (user.length === 7) {
              BadgeUser.create({ id_user: id_user, id_badge: 2 });
              pusher.trigger("badge", "triggerBadge", {
                message: "Pick Up The Pace",
              });
            }
          }
        );
      }
    }
  );

  BadgeUser.findAll({ where: { id_user: id_user, id_badge: 3 } }).then(
    (badge) => {
      if (badge.length === 0) {
        UserSoal.findAll({ where: { id_user: id_user, result: "true" } }).then(
          (user) => {
            if (user.length === 15) {
              BadgeUser.create({ id_user: id_user, id_badge: 3 });
              pusher.trigger("badge", "triggerBadge", {
                message: "Owning!",
              });
            }
          }
        );
      }
    }
  );
};
