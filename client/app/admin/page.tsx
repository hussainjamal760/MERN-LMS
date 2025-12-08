'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminProtected from "../hooks/adminProtected"
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import DashboardHero from '../components/Admin/DashboardHero'

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

            <div className="flex min-h-screen">
               
                <div className="w-[80px] md:w-[290px] flex-shrink-0 transition-all duration-500">
                   <AdminSidebar/>
                </div>
                
                <div className='flex-1 p-6 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900'>
                   <h1 className="text-2xl font-bold dark:text-white">Dashboard Overview</h1>
                   <p className='text-gray-500 mt-2'>Welcome back, Hussain.</p>
                   
                   <div className="mt-10 h-[150vh] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                    <DashboardHero isDashboard={true}/>
                   </div>
                </div>
            </div>
        </AdminProtected>
    </div>
  )
}

export default page