import CoursePlayer from '@/app/utils/CoursePlayer'
import React from 'react'
import CourseContentList from "../Course/CourseContentList"
 

type Props = {}

const CourseDetails = (props: Props) => {
  return (
   <>
    <CoursePlayer videoUrl='' title=""/>
    <CourseContentList/>

   </>
  )
}

export default CourseDetails