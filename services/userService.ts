import userPersistence from "../persistence/userPersistence";

const queryAddEmail = (email: string, api_key: string): Promise<boolean> => {
  return userPersistence.queryAddEmail(email, api_key);
};

export default {
  queryAddEmail,
};
