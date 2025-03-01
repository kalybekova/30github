"use client";
import { useUserQuery } from "@/redux/api/user";
import Image from "next/image";
import s from "./AllRecommend.module.scss";
import user from "@/assets/user.png";

const AllRecommend = () => {
  const { data: users } = useUserQuery();
  console.log("🚀 ~ Stories ~ data:", users);
  return (
    <section className={s.RecommendFollower}>
      <div className={s.content}>
        <div className={s.head}>
          <h2>Suggested</h2>
        </div>

        {users?.map((item) => (
          <div className={s.block} key={item.id}>
            <div className={s.blockLeft}>
              <Image
                src={item.profile_picture || user}
                alt="photo"
                width={50}
                height={50}
              />
              <h5>{item.username}</h5>
            </div>
            <button>Follow</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllRecommend;
