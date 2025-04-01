"use client";
import { useGetPostDetailQuery } from "@/redux/api/createPost";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./ModalDetail.module.scss";

const ModalDetail = ({ postId }: any) => {
  const { data, isLoading, error } = useGetPostDetailQuery(postId);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;
  if (!data) return <p>Данных нет</p>;

  const images = Object.values(data.post_connect).filter(
    (img) =>
      typeof img === "string" && img.trim() !== "" && !img.includes("string")
  );

  return (
    <section className={s.modal}>
      <div className={s.content}>
        {images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className={s.swiper}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className={s.swiperSlide}>
                <img
                  src={img}
                  alt={`Фото ${index + 1}`}
                  className={s.previewImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Нет изображений</p>
        )}
      </div>
    </section>
  );
};

export default ModalDetail;
