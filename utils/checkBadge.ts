import { UserSoal } from "../models/users_soal";
import { pusher } from "..";
import { BadgeUser } from "../models/badge_user";
import { ItemUser } from "../models/item_user";

export const triggerSoalBadge = (id_user: string) => {
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

export const triggerLevel = (
  id_user: string,
  level: string,
  matpel: string
) => {
  BadgeUser.findAll({ where: { id_user: id_user, id_badge: 4 } }).then(
    (badge) => {
      if (badge.length === 0) {
        BadgeUser.create({ id_user: id_user, id_badge: 4 });
        pusher.trigger("badge", "triggerBadge", {
          message: "First Badge!",
        });
      }
    }
  );

  BadgeUser.findAll({ where: { id_user: id_user, id_badge: 5 } }).then(
    (badge) => {
      if (badge.length === 0) {
        if (level === "Hard" && matpel === "fisika") {
          BadgeUser.create({ id_user: id_user, id_badge: 5 });
          pusher.trigger("badge", "triggerBadge", {
            message: "Physician Badge!",
          });
        }
      }
    }
  );

  BadgeUser.findAll({ where: { id_user: id_user, id_badge: 6 } }).then(
    (badge) => {
      if (badge.length === 0) {
        if (level === "Hard" && matpel === "kimia") {
          BadgeUser.create({ id_user: id_user, id_badge: 6 });
          pusher.trigger("badge", "triggerBadge", {
            message: "Chemist’s Badges",
          });
        }
      }
    }
  );
};

export const triggerItem = (id_user: string) => {
  BadgeUser.findAll({ where: { id_user: id_user, id_badge: 7 } }).then(
    (badge) => {
      if (badge.length === 0) {
        ItemUser.findOne({ where: { id_user: id_user } }).then((item) => {
          if (item !== null && item.spent === 3) {
            BadgeUser.create({ id_user: id_user, id_badge: 7 });
            pusher.trigger("badge", "triggerBadge", {
              message: "Item Collector Badges",
            });
          }
        });
      }
    }
  );
};
