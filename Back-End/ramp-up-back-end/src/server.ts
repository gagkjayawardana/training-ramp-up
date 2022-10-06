import express from "express";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./dataSource";
import { ErrorInterface } from "./interfaces/servertypes";
import studentRoutes from "./routes/studentRoutes";

const cors = require("cors");

const app = express();
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use(express.json());
app.use("/student", studentRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err: ErrorInterface = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err: ErrorInterface, req: Request, res: Response) => {
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message,
    },
  });
});

// const studentRouter = require("./routes/studentRoutes");

// app.get("/", (req: Request, res: Response) => {
//   res.send("Ramp Up");
// });
// app.use("/student", studentRouter);

app.listen(8000, () => {
  console.log("Application started on port 8000!");
});
