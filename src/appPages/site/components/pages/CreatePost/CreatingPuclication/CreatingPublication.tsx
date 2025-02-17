"use client";
import s from "./CreatingPublication.module.scss";
import { IoMdImages } from "react-icons/io";
import ReactDOM from "react-dom";
import { useModal } from "@/provider/modalProvider";
import CreatePost from "../CreatePost";
import { useRef, useState } from "react";
import { useUserQuery } from "@/redux/api/auth";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import {
  usePostContentMutation,
  usePostPostCreateMutation,
} from "@/redux/api/createPost";
import { SubmitHandler, useForm } from "react-hook-form";

const CreatingPublication = () => {
  const { openModal } = useModal();
  const { data: users } = useUserQuery();
  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);

  const [postContentMut] = usePostContentMutation<Post>();
  const [postTextMut] = usePostPostCreateMutation<PostText>();

  const { handleSubmit, register } = useForm<Post>();

  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null); // Создаём ссылку на input

  const [step, setStep] = useState(1); // Управление шагами

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };
  const handleFileClick = () => {
    fileInputRef.current?.click(); // Симулируем клик по input
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
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
      console.log("Post created successfully:", postResponse);

      // Теперь отправляем текстовое описание
      const postTextResponse = await postTextMut({
        post_connect: postResponse.id,
        text: text,
      }).unwrap();
      console.log("Text post created successfully:", postTextResponse);

      alert("Post created successfully!");
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error occurred. Check console.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3)); // Переключение вперёд
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1)); // Переключение назад

  return ReactDOM.createPortal(
    <section className={s.modal}>
      <div className={s.block}>
        <h3>
          Creating a publication <hr />
        </h3>
        <div className={s.content}>
          {step === 1 && (
            <>
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
            </>
          )}

          {step === 2 && <h2>Step 2: Edit your photo</h2>}
          {step === 3 && <h2>Step 3: Write a caption</h2>}

          <div className={s.navigation}>
            {step > 1 && <button onClick={prevStep}>Back</button>}
            {step < 3 && <button onClick={nextStep}>Next</button>}
          </div>
        </div>
      </div>
    </section>,
    document.body
  );
};

export default CreatingPublication;
