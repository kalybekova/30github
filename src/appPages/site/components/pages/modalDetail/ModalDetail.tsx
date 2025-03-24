"use client";
import { useGetPostDetailQuery } from "@/redux/api/createPost";
import s from "./ModalDetail.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const ModalDetail = ({ postId }: any) => {
  const { data, isLoading, error } = useGetPostDetailQuery(postId);
  console.log("🚀 ~ ModalDetail ~ data:", data);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;
  if (!data) return <p>Данных нет</p>;

  const images = [
    data.post_connect.post_img1,
    data.post_connect.post_img2,
    data.post_connect.post_img3,
    data.post_connect.post_img4,
    data.post_connect.post_img5,
    data.post_connect.post_img6,
    data.post_connect.post_img7,
    data.post_connect.post_img8,
    data.post_connect.post_img9,
    data.post_connect.post_img10,
  ].filter(Boolean);
  console.log("🚀 ~ ModalDetail ~ images:", images);

  return (
    <section className={s.modal}>
      <div className={s.content}>
        <Swiper
          pagination={{ clickable: true, dynamicBullets: true }}
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
