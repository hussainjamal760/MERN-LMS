"use client";
import React, { FC, useState ,useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Lottie from "lottie-react";
import animationData from "../../../public/hero-img.json"; 
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useRouter } from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, refetch } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    import("gsap").then((gsapModule) => {
        const gsap = gsapModule.default;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(".hero-main-title", 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
            )
            .fromTo(".hero-subtitle",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(".hero-search-box",
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.5"
            )
            .fromTo(".hero-social-proof",
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.5"
            )
            .fromTo(".hero-lottie-anim",
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.7)" },
                "-=1"
            );
        });
        return () => ctx.revert();
    });
  }, []);

  const handleSearch = () => {
    if (search === "") {
      return;
    }
    router.push(`/courses?title=${search}`);
  };

  return (
    <div className="w-full flex items-center min-h-[calc(100vh-80px)] relative overflow-hidden">
      <div className="absolute top-[100px] left-[50px] w-[400px] h-[400px] hero_animation rounded-[50%] blur-[120px] z-[1] opacity-50 md:opacity-100" />

      <div className="w-[95%] md:w-[92%] m-auto flex flex-col md:flex-row items-center justify-between z-[10] relative py-10 md:py-0">
        
        <div className="w-full md:w-[50%] flex justify-center items-center md:order-2">
          <div className="hero-lottie-anim opacity-0 w-[280px] h-[280px] md:w-[500px] md:h-[500px]">
             {animationData && <Lottie animationData={animationData} loop={true} />}
          </div>
        </div>

        <div className="w-full md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0 md:order-1">
          <h2 className="hero-main-title opacity-0 text-[32px] sm:text-[40px] md:text-[60px] font-[500] font-[family:var(--font-family-josefin)] text-[#000000c7] dark:text-white leading-[1.2] max-w-[600px] md:max-w-none">
            <span className="relative inline-block bg-gradient-to-r from-[#37a39a] via-[#4facfe] to-[#37a39a] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(79,172,254,0.9)] cursor-pointer">
              Sheep Academy :
            </span>
            {" "}{data?.layout?.banner?.title}
          </h2>
          
          <p className="hero-subtitle opacity-0 mt-4 text-[16px] md:text-[18px] font-[family:var(--font-family-poppins)] font-[400] text-[#000000ac] dark:text-[#edfff4] max-w-[500px] md:max-w-[600px]">
            {data?.layout?.banner?.subTitle}
          </p>

          <div className="hero-search-box opacity-0 w-full max-w-[500px] mt-8 relative">
            <input
              type="search"
              placeholder="Search Courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border border-gray-400 dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-3 w-full h-[50px] outline-none text-[#000000e6] dark:text-[#ffffffe6] text-[16px] font-[family:var(--font-family-josefin)] font-[500]"
            />
            <div 
              className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
              onClick={handleSearch}
            >
              <BiSearch className="text-white" size={30} />
            </div>
          </div>

          <div className="hero-social-proof opacity-0 w-full flex items-center mt-10 justify-center md:justify-start">
            <div className="flex -space-x-4">
              <Image src="/user1.jpg" alt="student" width={50} height={50} className="rounded-full border-[3px] border-white dark:border-black" />
              <Image src="/user2.jpg" alt="student" width={50} height={50} className="rounded-full border-[3px] border-white dark:border-black" />
              <Image src="/user3.jpg" alt="student" width={50} height={50} className="rounded-full border-[3px] border-white dark:border-black" />
            </div>
            <p className="font-[family:var(--font-family-poppins)] font-[600] text-[16px] md:text-[18px] text-black dark:text-[#edfff4] ml-4">
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