export const getNowUtcIsoString = () => {
  return new Date(new Date().getUTCDate()).toISOString();
};
