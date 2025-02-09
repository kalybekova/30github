"use client";
import { useLogOutMutation, useUserQuery } from "@/redux/api/auth";
import React from "react";

const Home = () => {
  const { data } = useUserQuery();
  const [logoutUser] = useLogOutMutation();
  console.log("🚀 ~ Header ~ data:", data);

  const handleLogout = async () => {
    const tokens = localStorage.getItem("tokens");
    if (!tokens) {
      console.error("Ошибка: нет токенов в localStorage.");
      return;
    }

    try {
      const parsedTokens = JSON.parse(tokens);
      const refreshToken = parsedTokens?.tokens?.refresh;

      if (!refreshToken) {
        console.error("Ошибка: отсутствует refresh токен.");
        return;
      }

      console.log("Отправляем запрос на logout...");
      await logoutUser({ refresh: refreshToken }).unwrap();

      localStorage.removeItem("tokens");
      console.log("Выход успешен!");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  return (
    <div>
      HomePage 1234567890
      {data?.map((el) => (
        <div key={el.id}>
          <img src={el.profile_picture} alt="" />
          <h1>{el.username}</h1>
          <button onClick={handleLogout}>logout</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
