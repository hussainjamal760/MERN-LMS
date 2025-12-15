'use client'
import Image from 'next/image';
import React, { FC } from 'react'
import { RiLockPasswordLine } from "react-icons/ri"
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { SiCoursera } from "react-icons/si"
import { AiOutlineLogout } from "react-icons/ai"
import Link from 'next/link';

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void
    logoutHandler: any;
}

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logoutHandler }) => {
    const menuItemClasses = "w-full flex items-center px-4 py-3 cursor-pointer transition-all duration-300 rounded-lg mb-3 hover:bg-gray-100 dark:hover:bg-slate-700";
    
    const iconColor = "#8C8C8C"; 
    

    return (
        <div className="w-[280px] p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            
            <div 
                className={`${menuItemClasses} ${active === 1 ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600" : ""}`} 
                onClick={() => setActive(1)}
            >
                <Image 
  src={
    user?.avatar?.url ||
    avatar ||
    "/avatar.png"
  }
  alt="avatar"
  width={40}
  height={40}
  className="rounded-full object-cover mr-4 border-2 border-transparent"
/>

                <h5 className={`${active === 1 ? "text-white font-semibold" : "text-gray-700 dark:text-gray-200"}`}>
                    My Account
                </h5>
            </div>

            <div 
                className={`${menuItemClasses} ${active === 2 ? "bg-gray-100 dark:bg-slate-700 font-medium" : ""}`} 
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={24} className={`mr-4 ${active === 2 ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`} />
                <h5 className={`${active === 2 ? "text-blue-500 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"}`}>
                    Change Password
                </h5>
            </div>

            <div 
                className={`${menuItemClasses} ${active === 3 ? "bg-gray-100 dark:bg-slate-700 font-medium" : ""}`} 
                onClick={() => setActive(3)}
            >
                <SiCoursera size={24} className={`mr-4 ${active === 3 ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`} />
                <h5 className={`${active === 3 ? "text-blue-500 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"}`}>
                    Enrolled Courses
                </h5>
            </div>

              {user.role === "admin" && <Link 
              href={"/admin"}
                className={`${menuItemClasses} ${active === 6 ? "bg-gray-100 dark:bg-slate-700 font-medium" : ""}`} 
            >
                <MdOutlineAdminPanelSettings size={24} className={`mr-4 ${active === 6 ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`} />
                <h5 className={`${active === 6 ? "text-blue-500 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"}`}>
                    Admin Dashboard
                </h5>
            </Link>}

            <div 
                className={`${menuItemClasses} mt-8 border-t pt-4 border-gray-200 dark:border-gray-700 !mb-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20`} 
                onClick={() => logoutHandler()}
            >
                <AiOutlineLogout size={24} className="mr-4 text-red-500" />
                <h5 className="font-medium text-red-500">
                    Log Out
                </h5>
            </div>

        </div>
    )
}

export default SideBarProfile