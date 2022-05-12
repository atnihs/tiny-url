import express from "express";
import { connectDB } from "./database/connect";
import tinyURL from "./routes/tinyURL";
require("dotenv").config();

const app = express();
app.use(express.json());

const port = 3000;

app.use("/api/user", tinyURL);

const start = () => {
  connectDB.connect(() => {
    console.log("Connect DB successfully!");
  });

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

start();
