"use client";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useUserByIdQuery } from "@/redux/api/user";
import { useUserQuery } from "@/redux/api/auth";
import Image from "next/image";
import s from "./EditProfile.module.scss";
import user from "@/assets/user.png";
import { SubmitHandler, useForm } from "react-hook-form";

const EditProfile = () => {
  const { data: users } = useUserQuery();

  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);
  const { data } = useUserByIdQuery(Number(currentUser.id));
  console.log("🚀 ~ MyUser ~ data:", data);
  const { register, handleSubmit } = useForm<PatchUser>();

  const onSubmit: SubmitHandler<PatchUser> = async (data) => {
    return await console.log(data);
  };

  return (
    <section className={s.EditProfile}>
      <div className={s.content}>
        <h1>Edit profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.myProfile}>
            <Image
              src={data?.profile_picture || user}
              alt="photo "
              width={50}
              height={50}
            />
            <div className={s.title}>
              <h4>{data?.username}</h4>
              <h5>{data?.first_name}</h5>
            </div>
            <button>Change photo</button>
          </div>
          <div className={s.bio}>
            <textarea></textarea>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
