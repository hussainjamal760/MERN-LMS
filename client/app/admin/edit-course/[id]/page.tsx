'use client'
import React, { use } from 'react'
import Heading from '../../../../app/utils/Heading'
import AdminSidebar from '../../../../app/components/Admin/sidebar/AdminSidebar'
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader'
import EditCourse from '../../../../app/components/Admin/Course/EditCourse'

type Props = {
    params: Promise<{ id: string }>
}

const page = ({params}:Props) => {
    const {id} = use(params)
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
                   <EditCourse id={id}/>
               </div>
           </div>
       </div>
  )
}

export default page