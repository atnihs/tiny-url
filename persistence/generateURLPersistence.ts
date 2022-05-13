import { connectDB } from "../database/connect";

const checkAPIKeyExists = (api_key: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    connectDB.query(
      "SELECT EXISTS ( SELECT * FROM `users` WHERE api_key = ?) as result",
      [api_key],
      function (err, results, fields) {
        if (err) return reject(err);
        const [{ result }] = results as { result: number }[];
        return resolve(Boolean(result));
      }
    );
  });
};

const addURL = (original_url: string, tiny_url: string) => {
  return new Promise((resolve, reject) => {
    connectDB.query(
      "INSERT INTO `url` (original_url, tiny_url) VALUES (? ,?)",
      [original_url, tiny_url],
      function (err) {
        if (err) return reject(err);
      }
    );
  });
};

export default {
  checkAPIKeyExists,
  addURL,
};
