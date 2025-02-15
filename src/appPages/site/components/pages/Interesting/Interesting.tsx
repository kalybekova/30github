"use client";
import s from "./Interesting.module.scss";
import { useGetAllPostQuery } from "@/redux/api/createPost";

const Interesting = () => {
  const { data } = useGetAllPostQuery();
  console.log("🚀 ~ Interesting ~ data:", data);
  return (
    <section className={s.Interesting}>
      <div className={s.content}>
        {data?.map((item) => (
          <div key={item.id} className={s.block}>
            <img src={item.post_connect.post_img1} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Interesting;
