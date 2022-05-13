import { connectDB } from "../database/connect";

const checkEmailExists = (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    connectDB.query(
      "SELECT EXISTS ( SELECT * FROM `users` WHERE email = ?) as result",
      [email],
      function (err, results, fields) {
        if (err) return reject(err);
        const [{ result }] = results as { result: number }[];
        return resolve(Boolean(result));
      }
    );
  });
};

const addEmail = (email: string, api_key: string) => {
  return new Promise((resolve, reject) => {
    connectDB.query(
      "INSERT INTO `users` (email, api_key) VALUES (?, ?)",
      [email, api_key],
      function (err, result) {
        if (err) return reject(err);
      }
    );
  });
};

export default {
  checkEmailExists,
  addEmail,
};
