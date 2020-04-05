import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger";
import { userRouter } from "./router/user.router";
import { tokenGuard } from "./middleware/tokenguard";
import { soalRouter } from "./router/soal.router";
import { quizRouter } from "./router/quiz.router";
import { menuRouter } from "./router/menu.router";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/public", express.static("public"));

app.use("/", userRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(tokenGuard());

// Protected ROUTE
app.use("/menu", menuRouter);
app.use("/soal", soalRouter);
app.use("/quiz", quizRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
