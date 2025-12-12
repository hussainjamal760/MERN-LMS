'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminProtected from "../hooks/adminProtected"
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import DashboardHero from '../components/Admin/DashboardHero'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="h-screen overflow-hidden">
      
        <AdminProtected>
            <Heading
                title='SheepAcademy - Admin'
                description='Sheep academy'
                keywords='mern'
            />

            <div className="flex h-screen">
                <div className="w-[80px] md:w-[290px] flex-shrink-0 transition-all duration-500 h-full border-r border-gray-200 dark:border-gray-700">
                   <AdminSidebar/>
                </div>
                
                <div className='flex-1 flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900'>
                   <div className="p-2 pb-0">
                      <h1 className="text-2xl font-bold text-black dark:text-white">Dashboard Overview</h1>
                      <p className='text-gray-500 mt-1'>Welcome back.</p>
                   </div>
                   
                   <div className="flex-1 p-2 overflow-hidden">
                      <DashboardHero isDashboard={true}/>
                   </div>
                </div>
            </div>
            
        </AdminProtected>
    </div>
  )
}

export default page