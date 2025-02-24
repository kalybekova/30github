"use client";
import { useLogOutMutation, useUserQuery } from "@/redux/api/auth";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useUserByIdQuery } from "@/redux/api/user";
import { useRouter } from "next/navigation";
import s from "./MyUser.module.scss";
import Image from "next/image";
import user from "@/assets/user.png";

const MyUser = () => {
  const router = useRouter();
  const { data: users } = useUserQuery();
  const [logoutUser] = useLogOutMutation();

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
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className={s.posts}>
          {data?.post.map((item) => (
            <div key={item.id} className={s.post}>
              <Image
                src={`http://13.61.17.230${item?.post_connect?.post_img1}`}
                alt="Фото"
                width={300}
                height={300}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div className={s.box}>
        <div className={s.publication}></div>
      </div>
    </section>
  );
};

export default MyUser;
