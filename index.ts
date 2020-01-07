import express, { Request, Response } from "express";
import cors from "cors";
const app = express();

let counter = [
  {
    id: "a1",
    val: 10
  },
  {
    id: "a2",
    val: 11
  }
];

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json(counter);
});

app.listen(5000, () => {
  console.log("server running");
});
