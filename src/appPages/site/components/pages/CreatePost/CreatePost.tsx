"use client";
import { usePostPostCreateMutation } from "@/redux/api/createPost";
import s from "./CreatePost.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useUserQuery } from "@/redux/api/auth";
import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const { data: users } = useUserQuery();
  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);
  const [postPostCreateMut] = usePostPostCreateMutation();
  const { register, handleSubmit } = useForm<Post>();

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit: SubmitHandler<Post> = async (data) => {
    // Создаем FormData
    const formData = new FormData();

    // Добавляем описание
    formData.append("description", data.description);

    // Добавляем ID автора
    formData.append("author", String(currentUser.id));

    // Если файл выбран, добавляем его с правильным ключом
    if (file) {
      formData.append("post[0][img]", file); // Добавляем файл с индексом 0
    } else {
      console.error("No file selected");
      return;
    }

    // Отправка запроса с использованием axios
    try {
      const response = await axios.post(
        "http://16.171.165.128/post/post_create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className={s.CreatePost}>
      <div className={s.content}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input
            type="text"
            {...register("description")}
            placeholder="description"
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">share</button>
        </form>
        {file && <img src={URL.createObjectURL(file)} alt="preview" />}
      </div>
    </section>
  );
};

export default CreatePost;
