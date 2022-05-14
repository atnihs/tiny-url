import { connectKnex } from "../database/connectKnex";

const checkAPIKeyExists = async (api_key: string): Promise<boolean> => {
  return await connectKnex("users")
    .select("*")
    .where("api_key", api_key)
    .then(async function (rows: string) {
      if (rows.length === 0) {
        return false;
      } else {
        return true;
      }
    });
};

const addURL = async (original_url: string, tiny_url: string) => {
  await connectKnex("url").insert({ original_url, tiny_url });
};

export default {
  checkAPIKeyExists,
  addURL,
};
