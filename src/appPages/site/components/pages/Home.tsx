"use client";
import s from "./Home.module.scss";
import Stories from "./Homestories/Stories";
import RecommendFollower from "./RecommendFollower/RecommendFollower";

const Home = () => {
  return (
    <div className={s.Home}>
      <div className="container">
        <div className={s.content}>
          <div className={s.main}>
            <Stories />
          </div>
          <div className={s.blockRigth}>
            <RecommendFollower />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
