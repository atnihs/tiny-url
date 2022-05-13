import generateURLPersistence from "../persistence/generateURLPersistence";

const checkAPIKeyExists = (api_key: string) => {
  return generateURLPersistence.checkAPIKeyExists(api_key);
};

const queryAddURL = (original_url: string, tiny_url: string) => {
  generateURLPersistence.addURL(original_url, tiny_url);
};

export default {
  checkAPIKeyExists,
  queryAddURL,
};
