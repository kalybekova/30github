"use client";
import { FC, ReactNode } from "react";
import scss from "./LayoutSite.module.scss";
import SideBar from "../pages/SideBar/SideBar";
import { useUserQuery } from "@/redux/api/auth";
import SignInPage from "@/appPages/auth/components/pages/SignInPage";
import { getUserData, findCurrentUser } from "@/utils/MyData";

interface IProps {
  children: ReactNode;
}

const LayoutSite: FC<IProps> = ({ children }) => {
  const { data: users } = useUserQuery();
  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId); // Ищем текущего пользователя

  return (
    <div className={scss.LayoutSite}>
      {/* <Header /> */}
      {currentUser ? (
        <div className={scss.block}>
          <SideBar />
          <main>{children}</main>
        </div>
      ) : (
        <div className={scss.auth}>
          <SignInPage />
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default LayoutSite;
