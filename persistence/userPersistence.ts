import { connectKnex } from "../database/connectKnex";

const queryAddEmail = async (
  email: string,
  api_key: string
): Promise<boolean> => {
  return await connectKnex("users")
    .select("*")
    .where("email", email)
    .then(async function (rows: string) {
      if (rows.length === 0) {
        await connectKnex("users").insert({
          email: email,
          api_key: api_key,
        });
        return true;
      } else {
        return false;
      }
    });
};

export default {
  queryAddEmail,
};
