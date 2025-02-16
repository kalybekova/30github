"use client";
import { FC, ReactNode } from "react";
import scss from "./LayoutSite.module.scss";
import SideBar from "../pages/SideBar/SideBar";
import { useUserQuery } from "@/redux/api/auth";
import SignInPage from "@/appPages/auth/components/pages/SignInPage";
import { getUserData, findCurrentUser } from "@/utils/MyData";
import { ModalProvider } from "@/provider/modalProvider";

interface IProps {
  children: ReactNode;
}

const LayoutSite: FC<IProps> = ({ children }) => {
  const { data: users } = useUserQuery();
  const { userId } = getUserData();
  const currentUser = findCurrentUser(users, userId);

  return (
    <ModalProvider>
      <div className={scss.LayoutSite}>
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
      </div>
    </ModalProvider>
  );
};

export default LayoutSite;
