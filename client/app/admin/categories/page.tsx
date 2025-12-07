'use client'
import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import EditCategories from '@/app/components/Admin/Customization/EditCategories'

type Props = {}

const page = (props: Props) => {
  return (
    <AdminProtected>
        <div className="flex min-h-screen overflow-hidden">
            <div className="hidden md:block w-[290px] fixed h-full z-50">
                <AdminSidebar />
            </div>

            <div className="flex-1 md:ml-[290px] w-full h-full overflow-y-auto bg-gray-50 dark:bg-[#0e1329]">
                <div className="p-4 md:p-8">
                     <DashboardHeader />
                     <Heading
                        title="MERN LMS - Categories"
                        description="Manage the categories of your platform"
                        keywords="Programming,MERN,Redux,Machine Learning"
                    />
                    
                    <div className="mt-8 min-h-[80vh] bg-white dark:bg-[#111C43] rounded-xl shadow-sm">
                        <EditCategories />
                    </div>
                </div>
            </div>
        </div>
    </AdminProtected>
  )
}

export default page