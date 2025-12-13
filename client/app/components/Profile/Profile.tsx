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
        <div className='w-[85%] flex mx-auto py-10 min-h-screen'> 
            <div className={`w-[300px] mr-10 transition-all duration-300 ${scroll ? "sticky top-[100px]" : "sticky top-[30px]"}`}>
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                />
            </div>
            
            <div className="flex-1 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                {active === 1 && <ProfileInfo avatar={avatar} user={user}/>}
                {active === 2 && <ChangePassword/>}
                
                {/* User Enrolled Courses Section */}
                {active === 3 && (
                    <div className="w-full    ">
                      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0">
                          {isLoading ? (
                               <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black justify-center w-full">
                                  Loading...
                              </h1>
                          ) : (
                              <>
                                {courses && courses.length > 0 ? (
                                    courses.map((item: any, index: number) => (
                                        <CourseCard item={item} key={index} isProfile={true} />
                                    ))
                                ) : (
                                    <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black justify-center w-full">
                                        You don't have any purchased courses!
                                    </h1>
                                )}
                                
                              </>
                          )}
                      </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile