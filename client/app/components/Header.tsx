'use client'
import Link from 'next/link';
import React, {FC, useState } from 'react'

type Props={
    open:boolean,
    setOpen:(open:boolean) =>void;
    activeItem:number
}

const Header:FC<Props> = ({open , setOpen,activeItem}) => {
    const [active, setActive] = useState(false)
    const [openSidebar , setOpenSidebar] = useState(false)

    if(typeof window !== "undefined"){
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>80){
                setActive(true)
            }else{
                setActive(false)
            }
        })
    }


  // Navabar Component File - (Dark/Light mode background fixed)

return (
  <div className="w-full relative">
    <div
      className={`
        ${
          active
            ? 
              "fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] dark:shadow bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:bg-opacity-50"
            : 
              "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow bg-white dark:bg-black"
        }
      `}
    >
    <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
        <div className="w-full flex items-center justify-between p-3 h-[80px]">
            <div>
                <Link href={"/"} className='text-[25px] font-Popins font-[500] text-black dark:text-white'>
                Sheep Academy
                </Link>
            </div>
        </div>
    </div>
        </div>
  </div>
);
}

export default Header