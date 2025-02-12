"use client";

import { useLogOutMutation, useUserQuery } from "@/redux/api/auth";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useRouter } from "next/navigation";
import s from "./MyUser.module.scss";
const MyUser = () => {
  const { data: users } = useUserQuery();
  const [logoutUser] = useLogOutMutation();
  const router = useRouter();

  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);

  const handleLogout = async () => {
    const tokens = localStorage.getItem("tokens");
    if (!tokens) {
      console.error("Ошибка: нет токенов в localStorage.");
      return;
    }

    const accessToken = JSON.parse(tokens).access;

    try {
      await logoutUser({ access: accessToken }).unwrap();
      localStorage.removeItem("tokens");
      router.push("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  return (
    <section className={s.MyUser}>
      <div className="container">
        {currentUser ? currentUser?.username : "anonim"}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
};

export default MyUser;
