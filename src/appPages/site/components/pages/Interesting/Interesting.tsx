"use client";
import { useModal } from "@/provider/modalProvider";
import s from "./Interesting.module.scss";
import { useGetAllPostQuery } from "@/redux/api/createPost";
import ModalDetail from "../modalDetail/ModalDetail";

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
            onClick={() => openModal(<ModalDetail />)}
          >
            <img src={item.post_connect.post_img1} alt="photos" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Interesting;
