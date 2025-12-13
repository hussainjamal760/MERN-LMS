'use client'
import React, { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { 
    FaHome, FaUsers, FaVideo, FaGraduationCap, FaChartBar, FaChartPie, 
    FaFileInvoice, FaCog, FaSignOutAlt, FaArrowRight, FaArrowLeft, 
    FaTeamspeak,
    FaPeopleArrows,
    FaBox,
    FaChartLine,
    FaQuestion,
    FaImage,
    FaDoorOpen
} from 'react-icons/fa'

type Props = {}

const AdminSidebar = (props: Props) => {
    const { user } = useSelector((state: any) => state.auth)
    const [isCollapsed, setIsCollapsed] = useState(false)

    const activeColor = "bg-gradient-to-r from-[#37a39a] to-[#55c8bf] shadow-lg shadow-[#37a39a]/30"
    const glassHover = "hover:bg-gray-100 dark:hover:bg-white/5"
const [mounted, setMounted] = useState(false) 

    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <div 
            className={`
                fixed top-0 left-0 z-[9999] h-screen
                bg-white dark:bg-[#111C43] 
                border-r border-gray-200 dark:border-gray-800 
                transition-all duration-500 ease-in-out
                flex flex-col justify-between
                ${isCollapsed ? 'w-[80px]' : 'w-[290px]'}
            `}
        >
            <div>
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-6 bg-white dark:bg-[#111C43] border border-gray-200 dark:border-gray-700 text-[#37a39a] p-1.5 rounded-full shadow-md z-50 hover:scale-110 transition-transform"
                >
                    {isCollapsed ? <FaArrowRight size={14} /> : <FaArrowLeft size={14} />}
                </button>

                <div className={`flex flex-col items-center pt-8 pb-4 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-6'}`}>
                    <div className={`
                        relative rounded-full p-[2px] border border-blue-400
                        transition-all duration-500
                        ${isCollapsed ? 'w-10 h-10' : 'w-20 h-20'}
                    `}>
                        <div className="bg-white dark:bg-[#111C43] rounded-full p-[2px] w-full h-full overflow-hidden">
                            <Image
                                src={user?.avatar?.url || "/assets/avatar.png"} 
                                alt="Admin"
                                width={100}
                                height={100}
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className={`text-center overflow-hidden transition-all duration-300 ${isCollapsed ? 'h-0 opacity-0 mt-0' : 'h-auto opacity-100 mt-3'}`}>
                        <h5 className="text-base font-bold text-gray-800 dark:text-white font-Poppins whitespace-nowrap">
                            {user?.name || "Hussain Jamal"}
                        </h5>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                            {user?.role || "Super Admin"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
                
                <SidebarItem title="Dashboard" icon={<FaHome size={20} />} to="/admin" active={true} isCollapsed={isCollapsed} activeClass={activeColor} hoverClass={glassHover} />

                <SectionLabel label="Data" isCollapsed={isCollapsed} />
                <SidebarItem title="Users" icon={<FaUsers size={20} />} to="/admin/users" isCollapsed={isCollapsed} hoverClass={glassHover} />
                <SidebarItem title="Invoices" icon={<FaFileInvoice size={20} />} to="/admin/invoices" isCollapsed={isCollapsed} hoverClass={glassHover} />

                <SectionLabel label="Content" isCollapsed={isCollapsed} />
                <SidebarItem title="Create Course" icon={<FaVideo size={20} />} to="/admin/create-course" isCollapsed={isCollapsed} hoverClass={glassHover} />
                <SidebarItem title="Live Courses" icon={<FaGraduationCap size={20} />} to="/admin/courses" isCollapsed={isCollapsed} hoverClass={glassHover} />

                <SectionLabel label="Customization" isCollapsed={isCollapsed} />
                <SidebarItem title="Hero" icon={<FaImage size={20} />} to="/admin/hero" isCollapsed={isCollapsed} hoverClass={glassHover} />
                <SidebarItem title="FAQ" icon={<FaQuestion size={20} />} to="/admin/faq" isCollapsed={isCollapsed} hoverClass={glassHover} />
                <SidebarItem title="Categories" icon={<FaBox size={20} />} to="/admin/categories" isCollapsed={isCollapsed} hoverClass={glassHover} />

                <SectionLabel label="Customization" isCollapsed={isCollapsed} />
                <SidebarItem title="Team" icon={<FaPeopleArrows size={20} />} to="/admin/team" isCollapsed={isCollapsed} hoverClass={glassHover} />

                <SectionLabel label="Analytics" isCollapsed={isCollapsed} />
                <SidebarItem title="Courses Stats" icon={<FaChartBar size={20} />} to="/admin/courses-analytics" isCollapsed={isCollapsed} hoverClass={glassHover} />
                <SidebarItem title="Users Stats" icon={<FaChartLine size={20} />} to="/admin/users-analytics" isCollapsed={isCollapsed} hoverClass={glassHover} />
                <SidebarItem title="Orders Stats" icon={<FaChartPie size={20} />} to="/admin/orders-analytics" isCollapsed={isCollapsed} hoverClass={glassHover} />

                <SectionLabel label="Back To" isCollapsed={isCollapsed} />
                <SidebarItem title="Home" icon={<FaDoorOpen size={20} />} to="/" isCollapsed={isCollapsed} hoverClass={glassHover} />

             </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111C43]">
                <button className={`
                    flex items-center w-full p-2 rounded-xl transition-all duration-300 group
                    hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}>
                    <FaSignOutAlt size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span className={`ml-3 font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>
                        Sign Out
                    </span>
                </button>
            </div>
        </div>
    )
}

const SectionLabel = ({ label, isCollapsed }: { label: string, isCollapsed: boolean }) => (
    <div className={`mt-4 mb-1 px-2 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100'}`}>
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{label}</p>
    </div>
)

const SidebarItem = ({ title, icon, to, active, isCollapsed, activeClass, hoverClass }: any) => (
    <Link href={to} className="block group">
        <div className={`
            flex items-center py-2.5 rounded-xl transition-all duration-300 cursor-pointer font-Poppins
            ${active ? `text-white ${activeClass}` : `text-gray-600 dark:text-gray-300 ${hoverClass}`}
            ${isCollapsed ? 'justify-center px-0' : 'px-4'}
        `}>
            <span className={`relative z-10 ${active ? 'scale-105' : 'group-hover:scale-110'} transition-transform`}>{icon}</span>
            <span className={`ml-3 text-[14px] font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0 ml-0' : 'w-auto opacity-100'}`}>{title}</span>
        </div>
    </Link>
)

export default AdminSidebar