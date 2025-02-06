import LayoutSite from "@/appPages/site/components/layout/LayoutSite";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const LayoutClient: FC<IProps> = ({ children }) => {
  return <LayoutSite>{children}</LayoutSite>;
};

export default LayoutClient;
