// import { connectDB } from "../database/connect";
import { connectKnex } from "../database/connectKnex";

// const checkEmailExists = (email: string): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     connectDB.query(
//       "SELECT EXISTS ( SELECT * FROM `users` WHERE email = ?) as result",
//       [email],
//       function (err, results, fields) {
//         if (err) return reject(err);
//         const [{ result }] = results as { result: number }[];
//         return resolve(Boolean(result));
//       }
//     );
//   });
// };

// const addEmail = (email: string, api_key: string) => {
//   return new Promise((resolve, reject) => {
//     connectDB.query(
//       "INSERT INTO `users` (email, api_key) VALUES (?, ?)",
//       [email, api_key],
//       function (err, result) {
//         if (err) return reject(err);
//       }
//     );
//   });
// };

const queryAddEmail = async (
  email: string,
  api_key: string
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    await connectKnex("users")
      .select("*")
      .where("email", email)
      .then(async function (rows: string) {
        if (rows.length === 0) {
          await connectKnex("users").insert({ email: email, api_key: api_key });
          resolve(Boolean(1));
        } else {
          reject(Boolean(0));
        }
      });
  });
};

export default {
  // checkEmailExists,
  // addEmail,
  queryAddEmail,
};
