"use client";

import { useUserQuery } from "@/redux/api/auth";
import React from "react";

const MyUser = () => {
  const { data: users } = useUserQuery();

  const tokens = localStorage.getItem("tokens");
  let userId = null;
  let accessToken = null;

  if (tokens) {
    try {
      const parsedTokens = JSON.parse(tokens);
      accessToken = parsedTokens.access; // Сохраняем access токен для запроса
      const decodedAccessToken = JSON.parse(
        atob(parsedTokens.access.split(".")[1])
      );
      userId = decodedAccessToken?.user_id;
      console.log("🚀 ~ userId:", userId);
    } catch (error) {
      console.error("Ошибка при декодировании токена:", error);
    }
  }

  const currentUser = users?.find((user) => user.id === userId);

  return <div>{currentUser?.username}</div>;
};

export default MyUser;
