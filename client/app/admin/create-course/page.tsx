'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
   <Heading
           title='SheepAcademy - Admin'
           description='Sheep academy'
           keywords='mern'
           />
           <div className="flex">
               <div className="1500px:w-[16%] w-1/5">
                   <AdminSidebar/>
               </div>
               <div className="w-[85%]">
                   <DashboardHeader/>
                   <CreateCourse/>
               </div>
           </div>
       </div>
  )
}

export default page