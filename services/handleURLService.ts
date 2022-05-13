import handleURLPersistence from "../persistence/handleURLPersistence";

const queryGetOriginalURL = (tiny_url: string) => {
  const a = handleURLPersistence.queryGetOriginalURL(tiny_url);
  console.log(a);
  return a;
};

export default {
  queryGetOriginalURL,
};
