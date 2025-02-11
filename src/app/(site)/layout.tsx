"use client";
import LayoutSite from "@/appPages/site/components/layout/LayoutSite";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
const layout: FC<IProps> = ({ children }) => {
  return <LayoutSite>{children}</LayoutSite>;
};

export default layout;
