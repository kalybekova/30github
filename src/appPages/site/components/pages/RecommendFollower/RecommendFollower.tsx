import { useUserQuery } from "@/redux/api/user";
import s from "./RecommendFollower.module.scss";
import Link from "next/link";
import Image from "next/image";
import user from "@/assets/user.png";

const RecommendFollower = () => {
  const { data: users } = useUserQuery();
  console.log("🚀 ~ Stories ~ data:", users);
  return (
    <section className={s.RecommendFollower}>
      <div className={s.content}>
        <div className={s.head}>
          <h2>Suggested for you</h2>
          <Link href="/recommend-followers">See all</Link>
        </div>

        {users?.slice(0, 5).map((item) => (
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
