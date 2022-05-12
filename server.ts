import express from "express";
import { connectDB } from "./database/connect";
const tinyURL = require("./routes/tinyURL");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = 3000;

app.use("/api/user", tinyURL);
// app.use("*", (req, res) => {
//   console.log("Not registered");
//   res.status(404).json("NOT FOUND");
// });

const start = () => {
  try {
    connectDB.connect();
    console.log("Connect DB successfully!");
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
