import userPersistence from "../persistence/userPersistence";

// const queryRegister = (email: string, api_key: string) => {
//   userPersistence.addEmail(email, api_key);
// };

// const checkEmailExists = (email: string): Promise<boolean> => {
//   return userPersistence.checkEmailExists(email);
// };

const queryAddEmail = (email: string, api_key: string): Promise<boolean> => {
  return userPersistence.queryAddEmail(email, api_key);
};

export default {
  // queryRegister,
  // checkEmailExists,
  queryAddEmail,
};
