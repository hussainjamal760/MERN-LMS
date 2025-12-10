import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import React from 'react'
import CourseCard from "../Course/CourseCard"
type Props = {}

const Courses = (props: Props) => {
    const {data , isLoading} = useGetUsersAllCoursesQuery({})

  return (
    <>
    <CourseCard/>
    </>
  )
}

export default Courses