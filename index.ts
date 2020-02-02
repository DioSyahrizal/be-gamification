import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./router/user.router";
import { tokenGuard } from "./middleware/tokenguard";

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRouter);

app.get(
  "/some-resource",
  (_req: Request, res: Response, _next: NextFunction) => {
    res.json("Hello World");
  }
);
app.use(tokenGuard());

// Protected Get
app.get(
  "/some-protected-resource",
  (_req: Request, res: Response, _next: NextFunction) => {
    res.json("Protected Hello World");
  }
);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
