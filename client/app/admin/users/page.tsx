'use client'
import React from 'react'
import DashboardHero from '../../../app/components/Admin/DashboardHero'
import AdminSidebar from '../../../app/components/Admin/sidebar/AdminSidebar'
import AllUsers from '../../../app/components/Admin/Users/AllUsers'
import Heading from '../../../app/utils/Heading'
import AdminProtected from "../../hooks/adminProtected"

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
            <Heading
                title='SheepAcademy - Admin'
                description='Sheep academy'
                keywords='mern'
            />

            <div className="flex h-screen overflow-hidden">
                
                <div className="1500px:w-[16%] w-1/5 fixed left-0 top-0 h-screen z-10 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                   <AdminSidebar/>
                </div>
            
                <div className="1500px:w-[84%] w-[80%] ml-auto p-4 overflow-y-auto h-screen bg-gray-50 dark:bg-gray-900 transition-all">
                   <DashboardHero/>
                   <AllUsers isTeam={false}/>
                </div>

            </div>
        </AdminProtected>
    </div>
  )
}

export default page