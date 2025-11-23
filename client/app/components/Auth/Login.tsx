"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/Login.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className="text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2">
        Login with Sheep Academy
      </h1>
      
      <div className="flex flex-col min-[900px]:flex-row items-center justify-center gap-5">
        
        <div className="hidden min-[900px]:flex w-full min-[900px]:w-[50%] justify-center items-center">
          {animationData ? (
            <Lottie animationData={animationData} loop={true} className="w-[90%]" />
          ) : (
            <div className="w-full h-[200px] flex items-center justify-center text-gray-500 text-sm">
              Loading Animation...
            </div>
          )}
        </div>

        <div className="w-full min-[900px]:w-[50%] p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="w-full relative">
              <label className="text-[16px] font-Poppins text-black dark:text-white" htmlFor="email">
                Enter your Email
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                id="email"
                placeholder="loginmail@gmail.com"
                className={`${
                  errors.email && touched.email && "border-red-500"
                } w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
              />
              {errors.email && touched.email && (
                <span className="text-red-500 pt-2 block text-sm">{errors.email}</span>
              )}
            </div>

            <div className="w-full relative">
              <label className="text-[16px] font-Poppins text-black dark:text-white" htmlFor="password">
                Enter your Password
              </label>
              <input
                type={!show ? "password" : "text"}
                name="password"
                value={values.password}
                onChange={handleChange}
                id="password"
                placeholder="password!@%"
                className={`${
                  errors.password && touched.password && "border-red-500"
                } w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
              {errors.password && touched.password && (
                <span className="text-red-500 pt-2 block text-sm">{errors.password}</span>
              )}
            </div>

            <div className="w-full mt-5">
              <input
                type="submit"
                value="Login"
                className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-[600] font-Poppins text-white"
              />
            </div>

            <br />
            
            <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
              Or join with
            </h5>
            <div className="flex items-center justify-center my-3 gap-4">
              <FcGoogle size={30} className="cursor-pointer" />
              <AiFillGithub size={30} className="cursor-pointer text-black dark:text-white" />
            </div>

            <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
              Not have any account?{" "}
              <span
                className="text-[#2190ff] pl-1 cursor-pointer"
                onClick={() => setRoute("Sign-Up")}
              >
                Sign up
              </span>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;