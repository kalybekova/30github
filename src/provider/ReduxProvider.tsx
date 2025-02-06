"use client ";
import LayoutSite from "@/appPages/site/components/layout/LayoutSite";
import { FC, ReactNode } from "react";

interface IPropsProvider {
  children: ReactNode;
}
const ReduxProvider: FC<IPropsProvider> = ({ children }) => {
  return <LayoutSite>{children}</LayoutSite>;
};

export default ReduxProvider;
