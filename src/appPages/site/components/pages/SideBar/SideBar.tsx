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
  {
    icon: <CiUser />,
    text: "Profile",
    active: false,
    path: "/profile",
  },
];

const SideBar = () => {
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
      </div>
    </section>
  );
};

export default SideBar;
