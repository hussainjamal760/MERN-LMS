'use client'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { HiOutlineBell, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import Link from 'next/link'
import socketIO from "socket.io-client";
import { useGetNotificationsQuery, useUpdateNotificationStatusMutation } from '../../../redux/features/notifications/notificationsApi';
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

const DashboardHeader = ({ open, setOpen }: Props) => {
    const { theme, setTheme } = useTheme();
    const [internalOpen, setInternalOpen] = useState(false);
    const isDropdownOpen = open !== undefined ? open : internalOpen;
    
    // API Hooks - UPDATED HOOK HERE
    const { data, refetch } = useGetNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    
    const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();
    
    // State
    const [notifications, setNotifications] = useState<any[]>([]);
    const [audio] = useState(new Audio('https://res.cloudinary.com/damk25wo5/video/upload/v1693425789/notification_sound_y4f7hc.mp3'));

    const handleToggle = () => {
        if (setOpen) {
            setOpen(!isDropdownOpen);
        } else {
            setInternalOpen(!internalOpen);
        }
    };

    const handleNotificationStatusChange = async (id: string) => {
        await updateNotificationStatus(id);
    }

    // Effect to set initial notifications from API
    useEffect(() => {
        if (data && data.notification) { //Backend returns {success:true, notification: []}
            setNotifications(data.notification.filter((item: any) => item.status === "unread"));
        }
        if (isSuccess) {
            refetch();
        }
    }, [data, isSuccess, refetch]);

    // Socket.io Real-time Listener
    useEffect(() => {
        socketId.on("newNotification", (data) => {
            refetch(); // Fetch latest data from DB
            playNotificationSound();
        });

        return () => {
            socketId.off("newNotification");
        };
    }, [refetch]);

    const playNotificationSound = () => {
        audio.play().catch(error => console.log("Audio play failed", error));
    }

    return (
        <div className="w-full flex items-center justify-end p-6 fixed top-0 right-0 z-[999] pointer-events-none">
            <div className="flex items-center space-x-4 pointer-events-auto bg-white/80 dark:bg-[#111C43]/80 backdrop-blur-md p-3 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                
                {/* Theme Switcher */}
                <div 
                    className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#ffffff12] transition-all"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'light' ? (
                        <HiOutlineMoon className="text-[25px] text-gray-600 hover:text-[#37a39a]" />
                    ) : (
                        <HiOutlineSun className="text-[25px] text-yellow-400 hover:text-yellow-300" />
                    )}
                </div>

                {/* Notification Icon */}
                <div className="relative cursor-pointer m-2" onClick={handleToggle}>
                    <HiOutlineBell className="text-2xl cursor-pointer dark:text-white text-black hover:text-[#37a39a] transition-colors" />
                    
                    {notifications && notifications.length > 0 && (
                         <span className="absolute -top-2 -right-2 bg-[#37a39a] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white font-bold animate-pulse">
                            {notifications.length}
                        </span>
                    )}
                </div>

                {/* Dropdown */}
                {isDropdownOpen && (
                    <div className="absolute top-16 right-4 w-[350px] bg-white dark:bg-[#111C43] shadow-2xl rounded-xl border border-gray-200 dark:border-[#ffffff1d] overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
                        <div className="text-center py-3 border-b border-gray-200 dark:border-[#ffffff1d] bg-gray-50 dark:bg-[#15204a]">
                            <h5 className="text-[18px] font-Poppins font-semibold text-black dark:text-white">
                                Notifications
                            </h5>
                            <p className="text-xs text-[#37a39a] cursor-pointer hover:underline mt-1" onClick={() => {/* Mark all logic */}}>
                                Mark all as read
                            </p>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            {notifications && notifications.map((item, index) => (
                                <div key={index} className="flex items-start p-3 border-b border-gray-100 dark:border-[#ffffff1d] hover:bg-gray-50 dark:hover:bg-[#ffffff12] transition-colors cursor-pointer group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#37a39a] to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                                        {item.title ? item.title.charAt(0) : "N"}
                                    </div>
                                    
                                    <div className="ml-3 w-full" onClick={() => handleNotificationStatusChange(item._id)}>
                                        <h6 className="text-[14px] font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#37a39a] transition-colors">
                                            {item.title}
                                        </h6>
                                        <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                            {item.message}
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-1">
                                            {format(item.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardHeader