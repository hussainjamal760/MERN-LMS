
'use client'
import React, { useEffect } from 'react'
import Loader from "../../components/Loader/Loader"
import { useLoadUserQuery } from "../../redux/features/api/apiSlice"
import { redirect } from "next/navigation"
import CourseContent from "../../components/Course/CourseContent"

type Props = {
    params: any
}

const Page = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (!isLoading && !data?.user) {
            redirect("/");
        }
    }, [data, error, isLoading]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="w-full">
            <CourseContent id={id} user={data.user} />
        </div>
    )
}

export default Page