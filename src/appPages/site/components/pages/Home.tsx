"use client";
import { useUserQuery } from "@/redux/api/auth";
import React from "react";

const Home = () => {
  const { data } = useUserQuery();
  console.log("🚀 ~ Header ~ data:", data);
  return <div>HomePage 1234567890</div>;
};

export default Home;
