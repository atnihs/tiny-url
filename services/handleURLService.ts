import handleURLPersistence from "../persistence/handleURLPersistence";

const queryGetOriginalURL = (tiny_url: string) => {
  return handleURLPersistence.queryGetOriginalURL(tiny_url);
};

export default {
  queryGetOriginalURL,
};
