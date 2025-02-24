import Image from "next/image";
import s from "./EditProfile.module.scss";
import { findCurrentUser, getUserData } from "@/utils/MyData";
import { useUserByIdQuery } from "@/redux/api/user";
const EditProfile = () => {
  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);
  const { data } = useUserByIdQuery(Number(currentUser.id));
  console.log("🚀 ~ MyUser ~ data:", data);
  return (
    <section className={s.EditProfile}>
      <div className={s.content}>
        <h1>Edit profile</h1>
        <div className={s.myProfile}>
          <Image src={} alt="photo" />
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
