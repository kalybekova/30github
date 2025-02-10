"use client";
import { useLogOutMutation, useUserQuery } from "@/redux/api/auth";
import React from "react";
import { useRouter } from "next/navigation";
import SideBar from "./SideBar/SideBar";

const Home = () => {
  const [logoutUser] = useLogOutMutation();
  const router = useRouter();

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
      HomePage
      <div>
        {/* {users?.map((el) => (
          <div key={el.id}>
            <h2>{el.username}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ))} */}
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
