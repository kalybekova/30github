"use client";

import { useLogOutMutation, useUserQuery } from "@/redux/api/auth";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useParams, usePathname, useRouter } from "next/navigation";
import s from "./MyUser.module.scss";
import Image from "next/image";
import { useUserByIdQuery } from "@/redux/api/createPost";
const MyUser = () => {
  const { data: users } = useUserQuery();
  const [logoutUser] = useLogOutMutation();
  const router = useRouter();
  const id = useParams();
  const { data } = useUserByIdQuery(Number(id));
  console.log("🚀 ~ MyUser ~ data:", data);

  // const { userId } = getUserData();
  // const currentUser = findCurrentUser(users, userId);

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
      <div className={s.content}>
        <div>
          <div>{/* <Image src={} alt="photo" /> */}</div>
        </div>
      </div>
      {/* {currentUser ? currentUser?.username : "anonim"}
      <button onClick={handleLogout}>Logout</button> */}
    </section>
  );
};

export default MyUser;
