
import React from 'react'
import CourseDetailsPage from "../../components/Course/CourseDetailsPage"

const Page = async ({params}: any) => {
   const resolvedParams = await params;

    return (
        <div>
            <CourseDetailsPage id={resolvedParams.id}/>
        </div>
    )
}

export default Page