"use client";
import Image from "next/image";
import s from "./SignInPage.module.scss";
import logo from "@/assets/Instagram Logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useLogInMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";

interface LogIn {
  username: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogIn>();
  const [logInFunc, { isLoading, error }] = useLogInMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LogIn> = async (data) => {
    try {
      console.log("Login data:", data);

      if (!data.username || !data.password) {
        console.error("Username or password is missing");
        return;
      }

      const res = await logInFunc(data).unwrap();

      if (res) {
        localStorage.setItem("tokens", JSON.stringify(res));
        router.refresh();
        router.push("/");
      }
    } catch (err: any) {
      console.error("Login error:", err?.data || err);
      alert("Invalid credentials or server error. Please try again.");
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
              {...register("username", { required: "Username is required" })}
              placeholder="User name"
            />
            {errors.username && <p>{errors.username.message}</p>}

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </button>

            <h5>
              <hr />
              OR
              <hr />
            </h5>
            <Link href="/auth/reset-password">Forgot password?</Link>
            <p>
              Don't have an account? <Link href="/auth/sign-up">Sign up.</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
