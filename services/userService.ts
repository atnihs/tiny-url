import userPersistence from "../persistence/userPersistence";

const queryAddEmail = (email: string, api_key: string): Promise<boolean> => {
  return userPersistence.queryAddEmail(email, api_key);
};

const checkEmailExists = (email: string): Promise<boolean> => {
  return userPersistence.checkEmailExists(email);
};

export default {
  queryAddEmail,
  checkEmailExists,
};
