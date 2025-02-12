import { GrHomeRounded } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { SlCompass } from "react-icons/sl";
import { TfiVideoClapper } from "react-icons/tfi";
import { CiSquarePlus } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import s from "./SideBAr.module.scss";
import { GoHeart } from "react-icons/go";
import { TbMessageCirclePlus } from "react-icons/tb";
import Image from "next/image";
import logo from "@/assets/Instagram Logo.svg";
import Link from "next/link";
import { useUserQuery } from "@/redux/api/auth";
import { findCurrentUser, getUserData } from "@/utils/MyData";

const arr = [
  {
    icon: <GrHomeRounded />,
    text: "Main",
    active: false,
    path: "/",
  },
  {
    icon: <IoIosSearch />,
    text: "Search query",
    active: false,
    path: "/search",
  },
  {
    icon: <SlCompass />,
    text: "Interesting",
    active: false,
    path: "/interesting",
  },
  {
    icon: <TfiVideoClapper />,
    text: "Reels",
    active: false,
    path: "/reels",
  },
  {
    icon: <TbMessageCirclePlus />,
    text: "Message",
    active: false,
    path: "/message",
  },
  {
    icon: <CiSquarePlus />,
    text: "Create",
    active: false,
    path: "/create",
  },
  {
    icon: <GoHeart />,
    text: "Notification",
    active: false,
    path: "/notification",
  },
];

const SideBar = () => {
  const { data: users } = useUserQuery();

  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);

  return (
    <section className={s.SideBar}>
      <div className={s.content}>
        <Image src={logo} alt="logo" />
        {arr.map((el, idx) => (
          <Link key={idx} href={el.path}>
            <div className={s.block}>
              <span>{el.icon}</span>
              <h2>{el.text}</h2>
            </div>
          </Link>
        ))}
        <Link href="profile">
          <div className={s.block}>
            <span>
              {currentUser?.profile_picture ? (
                <img src={currentUser.profile_picture} alt="photo" />
              ) : (
                <CiUser />
              )}
            </span>

            <h2>{currentUser.username} </h2>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SideBar;
