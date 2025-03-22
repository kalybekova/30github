"use client";
import { useGetPostDetailQuery } from "@/redux/api/createPost";
import s from "./ModalDetail.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const ModalDetail = ({ postId }) => {
  const { data, isLoading, error } = useGetPostDetailQuery(postId);
  console.log("🚀 ~ ModalDetail ~ data:", data);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;
  if (!data) return <p>Данных нет</p>;

  // Создаем массив изображений (добавляем http:// если его нет)
  const images = Object.values(data.post_connect)
    .filter((img) => typeof img === "string" && img.trim() !== "")
    .map((img) => (img.startsWith("http") ? img : `http://13.61.17.230${img}`));

  console.log("🚀 ~ Images:", images); // Проверяем в консоли

  return (
    <section className={s.modal}>
      <div className={s.content}>
        <Swiper
          pagination={{ clickable: true }}
          navigation
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          className={s.imageSlider}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className={s.imageWrapper}>
                <img
                  src={img}
                  alt={`Фото ${index + 1}`}
                  className={s.previewImage}
                  width="500"
                  height="500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ModalDetail;
