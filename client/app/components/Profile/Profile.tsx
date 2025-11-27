// Profile.tsx

import React, { FC, useState } from 'react'
import SideBarProfile from './SideBarProfile';
import { useLogOutQuery } from '@/redux/auth/authapi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ProfileInfo from './ProfileInfo';

type Props = {
    user: any
}


const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null)
    const [active, setActive] = useState(1)
    const [logout,setLogout] = useState(false)
    const {} = useLogOutQuery(undefined , {
      skip:!logout ? true : false
    })

    const logoutHandler = async () => {
      signOut()
       await setLogout(true)
  
    }

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }

    return (
        <div className='w-[85%] flex mx-auto py-10 min-h-screen'> 
            <div className={`w-[300px] mr-10 transition-all duration-300 ${scroll ? "sticky top-[100px]" : "sticky top-[30px]"}`}>
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                />
            </div>
            
            <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                {active === 1 && <h1 className="text-3xl font-bold dark:text-white"><ProfileInfo avatar={avatar} user={user}/></h1>}
                {active === 2 && <h1 className="text-3xl font-bold dark:text-white">Change Password Form</h1>}
                {active === 3 && <h1 className="text-3xl font-bold dark:text-white">User Enrolled Courses List</h1>}
            </div>
        </div>
    )
}

export default Profile