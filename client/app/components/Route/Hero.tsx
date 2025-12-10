"use client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Lottie from "lottie-react";
import animationData from "../../../public/hero-img.json"; 
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {};

const Hero: FC<Props> = (props) => {
  const {data , refetch} = useGetHeroDataQuery("Banner" , {})
  return (
    <div className="w-full flex items-center min-h-[calc(100vh-80px)]">
      <div className="absolute top-[100px] left-[50px] w-[400px] h-[400px] hero_animation rounded-[50%] blur-[120px] z-[1]" />

      <div className="w-[95%] md:w-[92%] m-auto flex flex-col md:flex-row items-center justify-between z-[10] relative">
        
        <div className="w-full md:w-[50%] flex justify-center items-center pt-10 md:pt-0">
          <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>

        <div className="w-full md:w-[50%] flex flex-col items-start text-center md:text-left mt-10 md:mt-0">
          <h2 className="text-[30px] md:text-[60px] font-[500] font-[family:var(--font-family-josefin)] text-[#000000c7] dark:text-white leading-[1.2]">
            {data?.layout?.banner?.title}
          </h2>
          
          <p className="mt-4 text-[18px] font-[family:var(--font-family-poppins)] font-[400] text-[#000000ac] dark:text-[#edfff4]">
            {data?.layout?.banner?.subTitle}

          </p>

          <div className="w-full mt-8 relative">
            <input
              type="search"
              placeholder="Search Courses..."
              className="bg-transparent border border-gray-400 dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-3 w-full h-[50px] outline-none text-[#000000e6] dark:text-[#ffffffe6] text-[16px] font-[family:var(--font-family-josefin)] font-[500]"
            />
            <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
              <BiSearch className="text-white" size={30} />
            </div>
          </div>

          <div className="w-full flex items-center mt-10 justify-center md:justify-start">
            <div className="flex -space-x-4">
              <Image
                src="/user1.jpg"
                alt="student"
                width={50}
                height={50}
                className="rounded-full border-[3px] border-white dark:border-black"
              />
              <Image
                src="/user2.jpg"
                alt="student"
                width={50}
                height={50}
                className="rounded-full border-[3px] border-white dark:border-black"
              />
              <Image
                src="/user3.jpg"
                alt="student"
                width={50}
                height={50}
                className="rounded-full border-[3px] border-white dark:border-black"
              />
            </div>
            <p className="font-[family:var(--font-family-poppins)] font-[600] text-[18px] text-black dark:text-[#edfff4] ml-4">
              500K+ People already trusted us.{" "}
              <Link href="/courses" className="text-[crimson] dark:text-[#46e256] cursor-pointer">
                View Courses
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;