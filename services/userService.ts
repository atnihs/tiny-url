import userPersistence from "../persistence/userPersistence";

const queryRegister = (email: string, api_key: string) => {
  userPersistence.addEmail(email, api_key);
};

const checkEmailExists = (email: string): Promise<boolean> => {
  return userPersistence.checkEmailExists(email);
};

export default {
  queryRegister,
  checkEmailExists,
};
