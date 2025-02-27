"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserQuery } from "@/redux/api/auth";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useEditProfileMutation, useUserByIdQuery } from "@/redux/api/user";
import Image from "next/image";
import user from "@/assets/user.png";
import s from "./EditProfile.module.scss";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const { data: users } = useUserQuery();
  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);
  const { data } = useUserByIdQuery(Number(currentUser.id));
  const [editProfile] = useEditProfileMutation();
  const router = useRouter();

  const { register, handleSubmit, setValue, watch } = useForm<PatchUser>({
    defaultValues: {
      first_name: data?.first_name,
      username: data?.username,
      bio: data?.bio,
      gender: data?.gender,
      profile_picture: data?.profile_picture,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setValue("profile_picture", file as any);
    }
  };

  const onSubmit: SubmitHandler<PatchUser> = async (formData) => {
    if (!currentUser?.id) {
      console.error("User ID не найден!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name || "");
    formDataToSend.append("bio", formData.bio || "");
    formDataToSend.append(
      "gender",
      formData.gender || "предпочитаю не указывать"
    );

    if (selectedFile) {
      formDataToSend.append("profile_picture", selectedFile);
    }

    try {
      await editProfile({
        id: Number(currentUser.id),
        data: formDataToSend,
      }).unwrap();
      alert("Profile updated successfully");
      router.push(`/${currentUser.id}`);
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  return (
    <section className={s.EditProfile}>
      <div className={s.content}>
        <h1>Edit profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.myProfile}>
            <div className={s.block}>
              <Image
                src={data?.profile_picture || user}
                alt="photo"
                width={50}
                height={50}
              />
              <div className={s.title}>
                <h4>Username</h4>
                <h5>{watch("first_name")}</h5>
              </div>
            </div>
            <label className={s.uploadButton}>
              Change photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className={s.bio}>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
            />
          </div>

          <div className={s.bio}>
            <input
              type="text"
              placeholder="First name"
              {...register("first_name")}
            />
          </div>

          <div className={s.bio}>
            <textarea {...register("bio")}></textarea>
          </div>
          <div className={s.select}>
            <select {...register("gender")}>
              <option value="женский">женский</option>
              <option value="мужской">мужской</option>
              <option value="другой">другой</option>
              <option value="предпочитаю не указывать">
                предпочитаю не указывать
              </option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
