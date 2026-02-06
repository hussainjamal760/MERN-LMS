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
    
        <div className="w-full p-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50">
            
            <div 
                className={`${menuItemClasses} ${active === 1 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300"}`} 
                onClick={() => setActive(1)}
            >
                <Image 
                    src={user?.avatar?.url || avatar || "/avatar.png"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className={`rounded-full object-cover mr-4 border-2 ${active === 1 ? "border-blue-500" : "border-transparent"} transition-all`}
                />
                <h5 className="text-[16px]">My Account</h5>
            </div>

            <div 
                className={`${menuItemClasses} ${active === 2 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300"}`} 
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={22} className="mr-4" />
                <h5 className="text-[16px]">Change Password</h5>
            </div>

            <div 
                className={`${menuItemClasses} ${active === 3 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300"}`} 
                onClick={() => setActive(3)}
            >
                <SiCoursera size={22} className="mr-4" />
                <h5 className="text-[16px]">Enrolled Courses</h5>
            </div>

              {user.role === "admin" && (
                <Link 
                    href={"/admin"}
                    className={`${menuItemClasses} ${active === 6 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300"}`} 
                >
                    <MdOutlineAdminPanelSettings size={22} className="mr-4" />
                    <h5 className="text-[16px]">Admin Dashboard</h5>
                </Link>
              )}

            <div 
                className={`${menuItemClasses} mt-4 !mb-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 border-t border-gray-100 dark:border-gray-700 pt-4 rounded-none`} 
                onClick={() => logoutHandler()}
            >
                <AiOutlineLogout size={22} className="mr-4" />
                <h5 className="text-[16px] font-medium">Log Out</h5>
            </div>

        </div>
    )
}

export default SideBarProfile