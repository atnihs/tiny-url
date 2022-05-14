import { connectKnex } from "../database/connectKnex";

const checkEmailExists = async (email: string): Promise<boolean> => {
  return await connectKnex("users")
    .select("*")
    .where("email", email)
    .then(function (rows: string) {
      if (rows.length === 0) {
        return true;
      } else {
        return false;
      }
    });
};

const queryAddEmail = async (email: string, api_key: string) => {
  await connectKnex("users").insert({
    email,
    api_key,
  });
};

export default {
  checkEmailExists,
  queryAddEmail,
};
