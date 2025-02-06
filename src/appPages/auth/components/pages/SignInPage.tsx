"use client";
import Image from "next/image";
import s from "./SignInPage.module.scss";
import logo from "@/assets/Instagram Logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

const SignInPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<LogIn> = async () => {
    return;
  };
  return (
    <section className={s.SignInPage}>
      <div className="container">
        <div className={s.content}>
          <Image src={logo} alt="instagram" />
          <form>
            <input type="text" />
            <input type="password" />
            <Link href="">Forgor password?</Link>
            <button>Log in</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
