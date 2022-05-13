import { connectDB } from "../database/connect";

const queryGetOriginalURL = (tiny_url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    connectDB.query(
      "SELECT original_url FROM `url` WHERE tiny_url = ?",
      [tiny_url],
      function (err, results, fields) {
        if (err) return reject(err);
        const [{ original_url }] = results as unknown as {
          original_url: any;
        }[];
        return resolve(original_url);
      }
    );
  });
};

export default {
  queryGetOriginalURL,
};