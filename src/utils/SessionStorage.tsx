export const GetSessionItem = (key: string): string | null => {
  // get data from sessionStorage
  return sessionStorage.getItem(key);
};

export const SetSessionItem = (key: string, value: string): void => {
  // set data to sessionStorage
  return sessionStorage.setItem(key, value);
};

// export default { GetSessionItem, SetSessionItem };
