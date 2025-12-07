// client/app/admin/faq/page.tsx
'use client'
import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import EditFaq from '@/app/components/Admin/Customization/EditFaq'

type Props = {}

const page = (props: Props) => {
  return (
    <AdminProtected>
        <div className="flex min-h-screen overflow-hidden">
             {/* Sidebar - Fixed width */}
            <div className="hidden md:block w-[290px] fixed h-full z-50">
                <AdminSidebar />
            </div>

             {/* Main Content */}
            <div className="flex-1 md:ml-[290px] w-full h-full overflow-y-auto bg-gray-50 dark:bg-[#0e1329]">
                <div className="p-4 md:p-8">
                     <DashboardHeader />
                     <Heading
                        title="MERN LMS - FAQ"
                        description="MERN LMS is a platform for students to learn and get help from teachers"
                        keywords="Programming,MERN,Redux,Machine Learning"
                    />
                    
                    <div className="mt-8 min-h-[80vh] bg-white dark:bg-[#111C43] rounded-xl shadow-sm">
                        <EditFaq />
                    </div>
                </div>
            </div>
        </div>
    </AdminProtected>
  )
}

export default page