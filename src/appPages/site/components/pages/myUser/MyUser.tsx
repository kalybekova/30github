"use client";

import { useLogOutMutation, useUserQuery } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import React from "react";

const MyUser = () => {
  const { data: users } = useUserQuery();
  const [logoutUser] = useLogOutMutation();
  const router = useRouter();

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

  const handleLogout = async () => {
    const tokens = localStorage.getItem("tokens");
    if (!tokens) {
      console.error("Ошибка: нет токенов в localStorage.");
      return;
    }

    const accessToken = JSON.parse(tokens).access;

    try {
      await logoutUser({ access: accessToken }).unwrap(); // Отправляешь токен на сервер
      localStorage.removeItem("tokens");
      router.push("/"); // Перенаправление на страницу логина
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  return (
    <div>
      {currentUser ? currentUser?.username : "anonim"}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MyUser;
