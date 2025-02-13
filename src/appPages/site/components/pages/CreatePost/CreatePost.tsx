"use client";
import {
  useGetAllPostQuery,
  usePostContentMutation,
  usePostPostCreateMutation,
} from "@/redux/api/createPost";
import s from "./CreatePost.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useUserQuery } from "@/redux/api/auth";
import { useState } from "react";

const CreatePost = () => {
  const { data: users } = useUserQuery();
  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);

  const [postPostCreateMut] = usePostPostCreateMutation(); // Для создания поста
  const [postContentMut] = usePostContentMutation(); // Для создания контента поста
  // const { data: resData } = useGetAllPostQuery();

  const { register, handleSubmit } = useForm<Post>();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  let img = "";

  const onSubmit: SubmitHandler<Post> = async (data) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    // try {
    //   const toBase64 = (file: File) =>
    //     new Promise<string>((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = () => resolve(reader.result as string);
    //       reader.onerror = (error) => reject(error);
    //     });

    //   let base64Image = await toBase64(file);
    //   base64Image = base64Image.split(",")[1]; // Убираем префикс
    //   img = base64Image;

    //   // Создаем FormData
    //   const formData = new FormData();
    //   formData.append("description", data.description);
    //   formData.append("author", currentUser.id);
    //   formData.append("img", base64Image); // Отправляем строку Base64 без префикса

    //   for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    //   }

    //   const postResponse = await postPostCreateMut(formData).unwrap();
    //   console.log("Post created successfully:", postResponse);
    //   alert("Post created successfully!");
    // } catch (error: any) {
    //   if (error.response) {
    //     console.error("Error Status:", error.response.status);
    //     console.error("Error Data:", error.response.data);
    //     alert(
    //       `Error ${error.response.status}: ${JSON.stringify(
    //         error.response.data
    //       )}`
    //     );
    //   } else {
    //     console.error("Network Error:", error.message);
    //     alert("Network error occurred. Please try again.");
    //   }
    // }
  };

  return (
    <section className={s.CreatePost}>
      <div className={s.content}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input
            type="text"
            {...register("description", { required: true })}
            placeholder="Description"
          />
          <input type="file" onChange={handleFileChange} required />
          <button type="submit">Share</button>
        </form>
        {file && <img src={URL.createObjectURL(file)} alt="Preview" />}
      </div>
    </section>
  );
};

export default CreatePost;
