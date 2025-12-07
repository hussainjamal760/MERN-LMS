// client/app/admin/hero/page.tsx
'use client'
import React from 'react'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import EditHero from '@/app/components/Admin/Customization/EditHero'
import AdminProtected from '@/app/hooks/adminProtected'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'

type Props = {}

const page = (props: Props) => {
  return (
    <AdminProtected>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Fixed width */}
        <div className="hidden md:block w-[290px] fixed h-full z-50">
          <AdminSidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 md:ml-[290px] w-full h-full overflow-y-auto bg-gray-50 dark:bg-[#0e1329]">
           <div className="p-4 md:p-8">
              <DashboardHeader />
              <Heading
                title="MERN LMS - Hero Customization"
                description="Customise the hero section of your platform"
                keywords="LMS,Hero,Admin"
              />
              
              <div className="mt-8 bg-white dark:bg-[#111C43] rounded-xl shadow-sm min-h-[80vh]">
                 <EditHero />
              </div>
           </div>
        </div>
      </div>
    </AdminProtected>
  )
}

export default page