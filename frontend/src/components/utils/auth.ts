export const getUserIdFromLocalStorage = (): string | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user)._id : null;
};
