import { connectDB } from "../database/connect";

export const checkEmailExists = (email: string): Promise<boolean> => {
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
