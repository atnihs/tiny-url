import { connectKnex } from "../database/connectKnex";

const checkAPIKeyExists = async (api_key: string): Promise<boolean> => {
  return await connectKnex("users")
    .select("*")
    .where("api_key", api_key)
    .then(async function (rows: string) {
      if (rows.length === 0) {
        return Boolean(0);
      } else {
        return Boolean(1);
      }
    });
};

const addURL = async (original_url: string, tiny_url: string) => {
  await connectKnex("url").insert({ original_url, tiny_url });
};

const queryGetOriginalURL = async (tiny_url: string): Promise<string> => {
  return await connectKnex("url")
    .select("original_url")
    .where("tiny_url", tiny_url);
};

export default {
  checkAPIKeyExists,
  addURL,
  queryGetOriginalURL,
};
