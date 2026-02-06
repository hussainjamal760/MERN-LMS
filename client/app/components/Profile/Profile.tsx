import React, { FC, useState, useEffect } from 'react'
import SideBarProfile from './SideBarProfile';
import { useLogOutQuery } from '@/redux/auth/authapi';
import { signOut } from 'next-auth/react';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import CourseCard from '../Course/CourseCard';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';

type Props = {
    user: any
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null)
    const [active, setActive] = useState(1)
    const [logout,setLogout] = useState(false)
    const {} = useLogOutQuery(undefined , {
      skip:!logout ? true : false
    })
    
    // Fetch all courses
    const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (data && user.courses) {
            // Filter courses: Match available courses with the user's enrolled courseIds
            const filteredCourses = data.courses.filter((course: any) => 
                user.courses.find((userCourse: any) => userCourse.courseId === course._id)
            );
            setCourses(filteredCourses);
        }
    }, [data, user.courses]);

    const logoutHandler = async () => {
      await signOut();
      setLogout(true);
    }

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }

    return (
        <div className='w-full max-w-7xl mx-auto py-10 min-h-screen px-4 font-Poppins'> 
            <div className={`w-full flex flex-col md:flex-row gap-6 relative`}>
                <div className={`w-full md:w-[300px] flex-shrink-0 transition-all duration-300 md:sticky ${scroll ? "md:top-[100px]" : "md:top-[30px]"}`}>
                    <SideBarProfile
                        user={user}
                        active={active}
                        avatar={avatar}
                        setActive={setActive}
                        logoutHandler={logoutHandler}
                    />
                </div>
                
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden h-fit">
                    <div className="p-6">
                        {active === 1 && <ProfileInfo avatar={avatar} user={user}/>}
                        {active === 2 && <ChangePassword/>}
                        
                        {/* User Enrolled Courses Section */}
                        {active === 3 && (
                            <div className="w-full">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">My Courses</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {isLoading ? (
                                        <div className="col-span-full flex justify-center py-10">
                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                                        </div>
                                    ) : (
                                        <>
                                            {courses && courses.length > 0 ? (
                                                courses.map((item: any, index: number) => (
                                                    <CourseCard item={item} key={index} isProfile={true} />
                                                ))
                                            ) : (
                                                <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                                                    You don't have any purchased courses yet!
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile