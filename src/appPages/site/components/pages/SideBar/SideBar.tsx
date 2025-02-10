import { GoHomeFill } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { FaCompass } from "react-icons/fa";
import { TfiVideoClapper } from "react-icons/tfi";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import s from "./SideBAr.module.scss";

const arr = [
  {
    icon: <GoHomeFill />,
    text: "Main",
  },
  {
    icon: <IoSearchSharp />,
    text: "Search query",
  },
  {
    icon: <FaCompass />,
    text: "Interesting",
  },
  {
    icon: <TfiVideoClapper />,
    text: "Reels",
  },
  {
    icon: <GoHomeFill />,
    text: "Message",
  },
  {
    icon: <FaRegPlusSquare />,
    text: "Create",
  },
  {
    icon: <FaUserAlt />,
    text: "Profile",
  },
];

const SideBar = () => {
  return (
    <section>
      <div className={s.content}>
        {arr.map((el, idx) => (
          <div key={idx} className={s.block}>
            <span>{el.icon}</span>
            <h2>{el.text}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SideBar;
