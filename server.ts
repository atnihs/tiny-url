import express, { Request, Response } from "express";
import { connectDB } from "./database/connect";
import handleUser from "./routes/userRoute";
import handleURL from "./routes/urlRoute";

require("dotenv").config();

const app = express();
app.use(express.json());

const port = 3000;

app.use("/api/user", handleUser);
app.use("/api/url", handleURL);

const start = () => {
  connectDB.connect(() => {
    console.log("Connect DB successfully!");
  });

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

start();
