"use client";
import Image from "next/image";
import s from "./SignInPage.module.scss";
import logo from "@/assets/Instagram Logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useLogInMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const { register, handleSubmit } = useForm<LogIn>();
  const [logInFunc] = useLogInMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LogIn> = async (data) => {
    console.log("🚀 ~ constonSubmit:SubmitHandler<LogIn>= ~ data:", data);
    try {
      const res = await logInFunc(data);
      if (res) {
        localStorage.setItem("tokens", JSON.stringify(res.data));
        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <section className={s.SignInPage}>
      <div className="container">
        <div className={s.content}>
          <Image src={logo} alt="instagram" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("username")}
              placeholder="User name"
            />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            <button type="submit">Log in</button>

            <h5>
              <hr />
              OR
              <hr />
            </h5>

            <Link href="">Forgor password?</Link>

            <p>
              Do not have an account? <Link href="/auth/sign-up">Sign up.</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
