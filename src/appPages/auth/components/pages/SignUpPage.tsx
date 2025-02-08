"use client";
import { useRegisterMutation } from "@/redux/api/auth";
import s from "./SignUpPage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import logo from "@/assets/Instagram Logo.svg";

const SignUpPage = () => {
  const [registerFunc] = useRegisterMutation();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null); // Ошибка для возраста
  const { register, handleSubmit } = useForm<Register>();

  const onSubmit: SubmitHandler<Register> = async (data) => {
    if (step === 1) {
      setStep(2); // Переход к проверке возраста
    } else {
      const age = calculateAge(new Date(data.age));
      if (age < 13) {
        setError("You must be at least 13 years old to sign up.");
      } else {
        setError(null);
        console.log("🚀 ~ User data:", data);
        // registerFunc(data); // Отправка данных на сервер
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
        <div className={s.content}>
          <Image src={logo} alt="instagram" />
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <>
                <input type="text" {...register("email")} placeholder="email" />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="password"
                />
                <input
                  type="text"
                  {...register("first_name")}
                  placeholder="first name"
                />
                <input
                  type="text"
                  {...register("username")}
                  placeholder="user name"
                />
                <button type="submit">Next</button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="date"
                  {...register("age")}
                  placeholder="Date of Birth"
                />
                {error && <p className={s.error}>{error}</p>}{" "}
                {/* Сообщение об ошибке */}
                <button type="submit">Submit</button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
