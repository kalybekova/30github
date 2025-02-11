"use client";
import MyUser from "./myUser/MyUser";
import s from "./Home.module.scss";

const Home = () => {
  return (
    <div className={s.Home}>
      <div className="container">
        <div>
          <MyUser />
        </div>
      </div>
    </div>
  );
};

export default Home;
