import urlPersistence from "../persistence/urlPersistence";

const checkAPIKeyExists = (api_key: string): Promise<boolean> => {
  return urlPersistence.checkAPIKeyExists(api_key);
};

const queryAddURL = (original_url: string, tiny_url: string) => {
  urlPersistence.addURL(original_url, tiny_url);
};

const queryGetOriginalURL = (tiny_url: string): Promise<any> => {
  return urlPersistence.queryGetOriginalURL(tiny_url);
};

export default {
  checkAPIKeyExists,
  queryAddURL,
  queryGetOriginalURL,
};
