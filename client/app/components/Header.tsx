"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import CustomModel from "../utils/CustomModel";
import Login from "./Auth/Login"
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route:string,
  setRoute : (route:string)=>void
};

const Header: FC<Props> = ({ open, setOpen, activeItem ,route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleClose=(e:any)=>{
    if(e.target.id === "screen"){
      setOpenSidebar(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] dark:shadow bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:bg-opacity-50"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow bg-white dark:bg-black"
        }`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full flex items-center justify-between p-3 h-[80px]">
            
            <div>
              <Link href="/">
               
                <Image
                  src="/logo.png" 
                  alt="Sheep Academy Logo"
                  width={150} 
                  height={40}
                  className="cursor-pointer object-contain" 
                  priority 
                />
              </Link>
            </div>

            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
            <ThemeSwitcher/>
            <div className="md:hidden">
              <HiOutlineMenuAlt3
              size={25}
              className="cursor-pointer dark:text-white text-black"
              onClick={()=>setOpenSidebar(true)}
              />
            </div>
            <HiOutlineUserCircle
            size={25}
            className=" hidden md:block cursor-pointer dark:text-white text-black"
            onClick={()=>setOpen(true)}
            />
            </div>
          </div>
        </div>
        
        
        {openSidebar && (
          <div className="fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]" onClick={handleClose} id="screen">
            <div className="w-[70%] fixed z-[999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              
              <Link href='/'>
=                 <Image
                  src="/logo.png"
                  alt="Sheep Academy Logo"
                  width={120} 
                  height={35}
                  className="cursor-pointer ml-5 my-4 object-contain"
                />
              </Link>

              <NavItems activeItem={activeItem} isMobile={true}/>
              <HiOutlineUserCircle
              size={25}
              className="cursor-pointer ml-5 my-2 text-black dark:text-white" onClick={()=>setOpen(true)}/>
              <br/>
              <br/>
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">Copyright &copy; 2026 Sheep Acadamy</p>
            </div>
          </div>
        )}

      </div>
      {
        route === "Login" && (
          <>
          <CustomModel
          open={open}
          route={route}
          setOpen = {setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          />
          </>
        )
      }
    </div>
  );
};

export default Header;