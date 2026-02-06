'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminProtected from "../hooks/adminProtected"
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import DashboardHero from '../components/Admin/DashboardHero'

type Props = {}

const page = (props: Props) => {
    // Determine default collapsed state based on screen width if feasible, but for SSR safety start false
    // We can use a hook for media query if we want it perfect, for now defaulting to open or closed
    const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="h-screen overflow-hidden">
      
        <AdminProtected>
            <Heading
                title='SheepAcademy - Admin'
                description='Sheep academy'
                keywords='mern'
            />

            <div className="flex h-screen">
                {/* Spacer div to prevent content overlap since sidebar is fixed */}
                <div className={`hidden md:block flex-shrink-0 transition-all duration-300 h-full ${isCollapsed ? 'w-[80px]' : 'w-[260px]'}`}>
                   {/* Sidebar itself is fixed, but we render it here to be semantically in the tree 
                       Usually if it's fixed, it doesn't matter WHERE it is rendered, but the spacer matters.
                       However, we need to pass props.
                   */}
                   <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
                </div>
                
                {/* Mobile Sidebar Handling: On mobile, sidebar is likely overlay or full width fixed, 
                    but our current AdminSidebar is fixed top-0 left-0.
                    We might need a mobile toggle. For now, let's keep basic desktop structure working.
                */}
                
                <div className='flex-1 flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900'>
                   <div className="p-4 pb-0 md:p-6 md:pb-0">
                      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
                      <p className='text-gray-500 mt-1 text-sm'>Welcome back, manage your platform efficiently.</p>
                   </div>
                   
                   <div className="flex-1 p-4 md:p-6 overflow-hidden">
                      <DashboardHero isDashboard={true}/>
                   </div>
                </div>
            </div>
            
        </AdminProtected>
    </div>
  )
}

export default page