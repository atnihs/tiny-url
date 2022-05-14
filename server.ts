import express, { Request, Response } from "express";
import { connectDB } from "./database/connect";
import { connectKnex } from "./database/connectKnex";
import tinyURL from "./routes/tinyURL";
import axios from "axios";
import nodeCache from "node-cache";

require("dotenv").config();

const app = express();
app.use(express.json());

const port = 3000;

const cache = new nodeCache();

app.get("/all", async (req: Request, res: Response) => {
  const result = await connectKnex.select("email", "api_key").from("users");
  res.json({
    data: result,
  });
});

app.get("/check", async (req: Request, res: Response) => {
  const { email } = req.body;
  const api_key = "1";
  await connectKnex("users")
    .select()
    .where("email", email)
    .then(async function (rows: string | any[]) {
      if (rows.length !== 0) {
        res.json({ message: "User exist" });
      } else {
        await connectKnex("users").insert({ email, api_key });
        res.json({
          data: { email, api_key },
        });
      }
    })
    .catch(function (err: any) {
      console.log("Error: " + err.message);
    });
});

app.use("/api/user", tinyURL);

// test cache
const verifyCache = (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    if (cache.has(id)) {
      return res.status(200).json(cache.get(id));
    }
    return next();
  } catch (err: any) {
    throw new Error(err);
  }
};

app.get("/cache/:id", verifyCache, async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    cache.set(id, data);
    return res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
  }
});

const start = () => {
  connectDB.connect(() => {
    console.log("Connect DB successfully!");
  });

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

start();
