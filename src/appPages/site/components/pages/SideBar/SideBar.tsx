"use client";
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
import { findCurrentUser, getUserData } from "@/utils/MyData";
import user from "@/assets/user.png";
import { useModal } from "@/provider/modalProvider";
import CreatingPublication from "../CreatePost/CreatingPuclication/CreatingPublication";
import { useUserQuery } from "@/redux/api/user";

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
    path: "",
    modal: <CreatingPublication />,
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
  const { openModal } = useModal();

  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);

  return (
    <section className={s.SideBar}>
      <div className={s.content}>
        <Image src={logo} alt="logo" />
        {arr.map((el, idx) => (
          <Link key={idx} href={el.path}>
            <div className={s.block} onClick={() => openModal(el.modal)}>
              <span>{el.icon}</span>
              <h2>{el.text}</h2>
            </div>
          </Link>
        ))}
        <Link href={`/${currentUser.id}`}>
          <div className={s.block}>
            <span>
              {currentUser?.profile_picture ? (
                <Image
                  src={`${currentUser?.profile_picture}` || user}
                  alt="photo"
                  width={30}
                  height={30}
                />
              ) : (
                <Image src={user} alt="photo" width={25} height={25} />
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
