"use client";
import { useUserQuery } from "@/redux/api/user";
import s from "./RecommendFollower.module.scss";
import Link from "next/link";
import Image from "next/image";
import user from "@/assets/user.png";
import { useMemo } from "react";

const RecommendFollower = () => {
  const { data: users } = useUserQuery();

  const randomUsers = useMemo(() => {
    if (!users) return [];
    return [...users].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [users]);

  return (
    <section className={s.RecommendFollower}>
      <div className={s.content}>
        <div className={s.head}>
          <h2>Suggested for you</h2>
          <Link href="/recommend-followers">See all</Link>
        </div>

        {randomUsers.map((item) => (
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

export default RecommendFollower;
