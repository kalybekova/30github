"use client";
import { useLogOutMutation, useUserQuery } from "@/redux/api/auth";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useRouter } from "next/navigation";
import s from "./MyUser.module.scss";
import Image from "next/image";
import user from "@/assets/user.png";
import { useUserByIdQuery } from "@/redux/api/user";

const MyUser = () => {
  const { data: users } = useUserQuery();
  const [logoutUser] = useLogOutMutation();
  const router = useRouter();

  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);
  const { data } = useUserByIdQuery(Number(currentUser.id));
  console.log("🚀 ~ MyUser ~ data:", data);

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
        <div className={s.header}>
          <div className={s.blockImg}>
            <Image
              src={data?.profile_picture || user}
              alt="photo"
              width={150}
              height={150}
            />
          </div>
          <div className={s.blockText}>
            <h3>{data?.username}</h3>
            <button>Edit profile</button>
          </div>
        </div>
        <div>
          {data?.post.map((item) => (
            <div key={item.id}>{item.count_like}</div>
          ))}
        </div>
      </div>

      <div className={s.box}>
        <div className={s.publication}>{/* <img src={data?.} alt="" /> */}</div>
      </div>
      {currentUser ? currentUser?.username : "anonim"}
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default MyUser;
