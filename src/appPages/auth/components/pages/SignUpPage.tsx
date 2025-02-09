"use client";
import { useRegisterMutation, useUserQuery } from "@/redux/api/auth";
import s from "./SignUpPage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import logo from "@/assets/Instagram Logo.svg";
import { useRouter } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";
import Link from "next/link";

const SignUpPage = () => {
  const [registerFunc] = useRegisterMutation();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();
  const { data: users } = useUserQuery();

  const router = useRouter();

  const tokens = localStorage.getItem("tokens");
  let userId = null;
  let accessToken = null;

  if (tokens) {
    try {
      const parsedTokens = JSON.parse(tokens);
      accessToken = parsedTokens.access; // Сохраняем access токен для запроса
      const decodedAccessToken = JSON.parse(
        atob(parsedTokens.access.split(".")[1])
      );
      userId = decodedAccessToken?.user_id;
      console.log("🚀 ~ userId:", userId);
    } catch (error) {
      console.error("Ошибка при декодировании токена:", error);
    }
  }

  const currentUser = users?.find((user) => user.id === userId);

  const onSubmit: SubmitHandler<Register> = async (data) => {
    if (step === 1) {
      setStep(2);
    } else {
      const age = calculateAge(new Date(data.age));
      if (age < 13) {
        setError("You must be at least 13 years old to sign up.");
      } else {
        setError(null);
        console.log("🚀 ~ User data:", data);
        try {
          const res = await registerFunc(data);
          if (res) {
            localStorage.setItem("tokens", JSON.stringify(res.data));
            router.push("/");
          }
        } catch (error) {
          console.error("Registration error:", error);
        }
      }
    }
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <section className={s.SignUpPage}>
      <div className="container">
        {currentUser ? (
          <div className={s.notFound}>
            <p>You are already logged in</p>
          </div>
        ) : (
          <div className={s.content}>
            <Image src={logo} alt="instagram" />
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <>
                  <label>
                    <input
                      type="text"
                      {...register("email", { required: "Email is required" })}
                      placeholder="email"
                    />
                    {errors.email && (
                      <p className={s.error}>{errors.email.message}</p>
                    )}
                  </label>

                  <label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="password"
                    />
                    {errors.password && (
                      <p className={s.error}>{errors.password.message}</p>
                    )}
                  </label>

                  <label>
                    <input
                      type="text"
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                      placeholder="first name"
                    />
                    {errors.first_name && (
                      <p className={s.error}>{errors.first_name.message}</p>
                    )}
                  </label>

                  <label>
                    <input
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      placeholder="user name"
                    />
                    {errors.username && (
                      <p className={s.error}>{errors.username.message}</p>
                    )}
                  </label>

                  <button
                    type="submit"
                    disabled={
                      !!errors.email ||
                      !!errors.password ||
                      !!errors.first_name ||
                      !!errors.username
                    }
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <div className={s.secondStep}>
                  <span onClick={() => setStep(1)}>
                    <MdArrowBackIos />
                  </span>
                  <input
                    type="date"
                    {...register("age", {
                      required: "Date of birth is required",
                    })}
                    placeholder="Date of Birth"
                  />
                  {errors.age && (
                    <p className={s.error}>{errors.age.message}</p>
                  )}
                  {error && <p className={s.error}>{error}</p>}
                  <button type="submit">Submit</button>
                </div>
              )}
              <p>
                There is an account?<Link href="/auth/sign-in">Sign in.</Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignUpPage;
