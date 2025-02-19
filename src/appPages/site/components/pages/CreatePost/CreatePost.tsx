"use client";
import {
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

  const [postContentMut] = usePostContentMutation<Post>();
  const [postTextMut] = usePostPostCreateMutation<PostText>();

  const { handleSubmit, register } = useForm<Post>();

  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
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

  return (
    <section className={s.CreatePost}>
      <div className={s.content}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input type="file" multiple onChange={handleFileChange} required />

          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Add a description"
            required
          />

          <button type="submit">Share</button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
