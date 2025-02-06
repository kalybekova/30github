"use client";
import { FC, ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface IProps {
  children: ReactNode;
}

const LayoutSite: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LayoutSite;
