import express from "express";
import { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Ramp Up");
});

app.listen(8000, () => {
  console.log("Application started on port 8000!");
});
