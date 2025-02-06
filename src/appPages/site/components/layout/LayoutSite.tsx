"use client";
import { FC, ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import scss from "./LayoutSite.module.scss";

interface IProps {
  children: ReactNode;
}

const LayoutSite: FC<IProps> = ({ children }) => {
  return (
    <div className={scss.LayoutSite}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutSite;
