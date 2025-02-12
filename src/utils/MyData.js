export const getUserData = () => {
  const tokens = localStorage.getItem("tokens");
  let userId = null;
  let accessToken = null;

  if (tokens) {
    try {
      const parsedTokens = JSON.parse(tokens);
      accessToken = parsedTokens.access;
      const decodedAccessToken = JSON.parse(
        atob(parsedTokens.access.split(".")[1])
      );
      userId = decodedAccessToken?.user_id;
    } catch (error) {
      console.error("Ошибка при декодировании токена:", error);
    }
  }

  return { userId, accessToken }; // Возвращаем userId и accessToken
};

export const findCurrentUser = (users, userId) => {
  return users?.find((user) => user.id === userId);
};
