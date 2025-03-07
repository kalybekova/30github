"use client";
import s from "./CreatingPublication.module.scss";
import ReactDOM from "react-dom";
import { IoMdImages } from "react-icons/io";
import { useModal } from "@/provider/modalProvider";
import { useRef, useState } from "react";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import {
  usePostContentMutation,
  usePostPostCreateMutation,
} from "@/redux/api/createPost";
import { useUserQuery } from "@/redux/api/user";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import user from "@/assets/user.png";
import EmojiInput from "@/ui/Emoji/Emoji";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CreatingPublication = () => {
  const { closeModal } = useModal();

  const router = useRouter();
  const { data: users } = useUserQuery();
  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);

  const [postContentMut] = usePostContentMutation<Post>();
  const [postTextMut] = usePostPostCreateMutation<PostText>();

  const { handleSubmit } = useForm<Post>();

  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(Array.from(event.target.files));
      setStep(2);
    } else {
      alert("Please select at least one image.");
    }
  };
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<Post> = async () => {
    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("author", currentUser.id.toString());

      files.forEach((file, index) => {
        formData.append(`post_img${index + 1}`, file);
      });

      const postResponse = await postContentMut(formData).unwrap();

      const postTextResponse = await postTextMut({
        post_connect: postResponse.id,
        text: text,
        author: currentUser.id,
      }).unwrap();

      alert("Post created successfully!");
      closeModal();
      router.push(`/${currentUser}`);
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error occurred. Check console.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return ReactDOM.createPortal(
    <section className={s.modal}>
      <div className={s.block}>
        <div className={s.navigation}>
          {step > 1 ? <button onClick={prevStep}>Back</button> : <h2></h2>}
          <h3>Creating a publication</h3>
          {step !== 1 && step < 3 ? (
            <button onClick={nextStep}>Next</button>
          ) : (
            <h2></h2>
          )}
        </div>

        <div className={s.content}>
          {step === 1 && (
            <div className={s.step1}>
              <span>
                <IoMdImages />
              </span>
              <h2>Drag and drop photos and videos here</h2>
              <button onClick={handleFileClick}>Choice on computer</button>
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  required
                />
              </form>
            </div>
          )}

          {step === 2 && (
            <Swiper
              pagination={{ clickable: true }} // Точки снизу
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              className={s.imageSlider}
            >
              {files.map((file, index) => (
                <SwiperSlide key={index}>
                  <div className={s.imageWrapper}>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded image ${index + 1}`}
                      fill
                      className={s.previewImage}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {step === 3 && (
            <div className={s.box}>
              <div className={s.imgBlock}>
                <Swiper
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  slidesPerView={1}
                  className={s.step3}
                >
                  {files.map((file, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded image ${index + 1}`}
                        width={500}
                        height={500}
                        className={s.foto3}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={s.textBlock}>
                <div className={s.head}>
                  <Image
                    src={currentUser.profile_picture || user}
                    alt="photo"
                    width={25}
                    height={25}
                  />
                  <h2>{currentUser.username}</h2>
                </div>
                <EmojiInput text={text} setText={setText} />
                <button onClick={handleSubmit(onSubmit)} type="submit">
                  share
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>,
    document.body
  );
};

export default CreatingPublication;
