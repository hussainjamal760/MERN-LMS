// client/app/admin/categories/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Heading from '@/app/utils/Heading'
import Loader from '@/app/components/Loader/Loader'

// Dynamically import ALL components with no SSR
const AdminProtected = dynamic(
  () => import('@/app/hooks/adminProtected'),
  { ssr: false }
)

const AdminSidebar = dynamic(
  () => import('@/app/components/Admin/sidebar/AdminSidebar'),
  { ssr: false }
)

const DashboardHeader = dynamic(
  () => import('@/app/components/Admin/DashboardHeader'),
  { ssr: false }
)

const EditCategories = dynamic(
  () => import('@/app/components/Admin/Customization/EditCategories'),
  { ssr: false }
)

type Props = {}

const Page = (props: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Loader />
  }

  return (
    <AdminProtected>
        <div className="flex min-h-screen overflow-hidden">
            <Heading
                title="MERN LMS - Categories"
                description="Manage the categories of your platform"
                keywords="Programming,MERN,Redux,Machine Learning"
            />
            
            <div className="hidden md:block w-[290px] fixed h-full z-50">
                <AdminSidebar />
            </div>

            <div className="flex-1 md:ml-[290px] w-full h-full overflow-y-auto bg-gray-50 dark:bg-[#0e1329]">
                <div className="p-4 md:p-8">
                     <DashboardHeader />
                    
                    <div className="mt-8 min-h-[80vh] bg-white dark:bg-[#111C43] rounded-xl shadow-sm">
                        <EditCategories />
                    </div>
                </div>
            </div>
        </div>
    </AdminProtected>
  )
}

export default Page