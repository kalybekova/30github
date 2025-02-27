"use client";
import { useModal } from "@/provider/modalProvider";
import s from "./Interesting.module.scss";
import { useGetAllPostQuery } from "@/redux/api/createPost";

const Interesting = () => {
  const { data } = useGetAllPostQuery();
  const { openModal } = useModal();
  return (
    <section className={s.Interesting}>
      <div className={s.content}>
        {data?.map((item) => (
          <div
            key={item.id}
            className={s.block}
            onClick={() => openModal(`/interesting/${item.id}`)}
          >
            <img src={item.post_connect.post_img1} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Interesting;
