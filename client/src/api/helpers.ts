export const getErrorMessage = (e: any): string => {
  return e.response.data.message;
};
