import express from "express";
import { connectDB } from "./database/connect";
import tinyURL from "./routes/tinyURL";
require("dotenv").config();

const app = express();
app.use(express.json());

const port = 3000;

app.use("/api/user", tinyURL);
// app.get("/encode", checkURL, encodeURL);
// app.get("/decode", decodeURL);

// app.get("/check", (req, res) => {
//   console.log(req.query);
// });

const start = () => {
  connectDB.connect(() => {
    console.log("Connect DB successfully!");
  });

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

start();
