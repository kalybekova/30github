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
  console.log("🚀 ~ CreatePost ~ file:", file);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit: SubmitHandler<Post> = async (data) => {
    if (!file) {
      console.error("File is required");
      return;
    }

    const formData = new FormData();

    formData.append("description", data.description);
    formData.append("author", String(currentUser.id));

    formData.append("post[0][img]", file);

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
      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error occurred:", error);
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
