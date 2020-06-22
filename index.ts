import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import Pusher from "pusher";
import cron from "node-cron";

import swaggerDocument from "./swagger";
import { userRouter } from "./router/user.router";
import { tokenGuard } from "./middleware/tokenguard";
import { soalRouter } from "./router/soal.router";
import { quizRouter } from "./router/quiz.router";
import { menuRouter } from "./router/menu.router";
import { leadRouter } from "./router/leaderboard.router";
import { itemRouter } from "./router/item.router";
import { controlRouter } from "./router/control.router";
import { badgeRouter } from "./router/badge.router";
import { questRouter } from "./router/quest.router";
import { UserSoal } from "./models/users_soal";

dotenv.config();
const app = express();

export const pusher = new Pusher({
  appId: "967809",
  key: "9ce3c8a195d350f6ff35",
  secret: "5ba29942044e37f4cb4e",
  cluster: "ap1",
  encrypted: true,
});

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/public", express.static("public"));

app.use("/", userRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(tokenGuard());
app.use("/quiz", quizRouter);
app.use("/leaderboard", leadRouter);
app.use("/menu", menuRouter);
app.use("/item", itemRouter);
app.use("/badge", badgeRouter);

// admin
app.use("/soal", soalRouter);
app.use("/control", controlRouter);
app.use("/quest", questRouter);

//rule pembukaan quest
cron.schedule(
  "01 00 * * Tuesday,Thursday",
  () => {
    UserSoal.destroy({ where: { matpel: "quest" } }).then((_res) =>
      console.dir("delete quest")
    );
  },
  { scheduled: true, timezone: "Asia/Jakarta" }
);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
