'use client'
import React, { useEffect } from 'react'
import Loader from "../../components/Loader/Loader"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import { redirect, useParams } from "next/navigation" 
import CourseContent from "../../components/Course/CourseContent"

type Props = {} 

const Page = (props: Props) => {
    const { id } = useParams() as any; 
    
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    useEffect(() => {
        if (!isLoading && !data?.user) {
            redirect("/");
        }
    }, [data, error, isLoading]); 

   if (isLoading || !data || !data.user) { 
        return <Loader />
    }

    return (
        <div className="w-full">
            <CourseContent id={id} user={data.user} />
        </div>
    )
}

export default Page