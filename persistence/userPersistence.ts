import { connectKnex } from "../database/connectKnex";

const queryAddEmail = async (email: string, api_key: string) => {
  await connectKnex("users").insert({
    email: email,
    api_key: api_key,
  });
};

const checkEmailExists = async (email: string): Promise<boolean> => {
  return await connectKnex("users")
    .select("*")
    .where("email", email)
    .then(async function (rows: string) {
      if (rows.length === 0) {
        return true;
      } else {
        return false;
      }
    });
};

export default {
  checkEmailExists,
  queryAddEmail,
};
