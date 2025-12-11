'use client'
import { useState } from 'react';
import CoursePlayer from '@/app/utils/CoursePlayer';
import CourseContentList from "./CourseContentList";
import Ratings from '@/app/utils/Ratings';
import { MdOutlineLocalOffer } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import Link from 'next/link';
import { IoCheckmarkDoneOutline, IoCloseOutline, IoPeopleOutline } from "react-icons/io5";
import { format } from 'timeago.js';
import {Elements} from "@stripe/react-stripe-js"
import CheckOutForm from "../Payments/CheckOutForm"
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

type Props = {
  data: any;
  clientSecret:string,
  stripePromise:any
}

const CourseDetails = ({ data , clientSecret ,stripePromise}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false)
  const { data: userData } = useLoadUserQuery(undefined, {});
  const user = userData?.user;

  const isPurchased = user && user.courses && user.courses.find((item: any) => item.courseId === data._id);

  const discountPercentage = ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = () =>{
    setOpen(true)
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
        setOpen(false);
    }
  }
  
   const appearance = {
    theme: 'night', 
    labels: 'floating',
    variables: {
        colorPrimary: '#005555',
        colorBackground: '#0f172a', 
        colorText: '#ffffff',       
        colorDanger: '#df1b41',
        fontFamily: 'Poppins, sans-serif',
        spacingUnit: '3px',
        borderRadius: '8px',
    },
  };

  return (
    <div className="w-[90%] 800px:w-[90%] m-auto py-5">
      <div className="w-full grid grid-cols-1 800px:grid-cols-10 gap-10">
        
        <div className="col-span-1 800px:col-span-7">
             <div className="w-full min-h-[400px]">
                <CoursePlayer
                    title={data?.title}
                    videoUrl={data?.demoUrl}
                />
             </div>
             <div className="flex items-center justify-between pt-6 pb-2">
                <div className="flex items-center px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 shadow-sm transition-transform hover:scale-105">
                    <Ratings rating={data?.ratings} />
                    <h5 className="text-amber-600 dark:text-amber-500 font-Poppins font-semibold text-[15px] ml-2">
                        {data?.reviews?.length} Reviews
                    </h5>
                </div>

                <div className="flex items-center px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 shadow-sm transition-transform hover:scale-105">
                    <IoPeopleOutline size={20} className="text-[#37a39a] mr-2" />
                    <h5 className="text-[#37a39a] font-Poppins font-semibold text-[15px]">
                        {data?.purchased} Students
                    </h5>
                </div>
            </div>

             <h1 className="text-[25px] font-[600] font-Poppins text-black dark:text-white mb-5 mt-2">
                {data?.name}
             </h1>
             
             <div className="w-full bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                 <h1 className="text-[20px] font-[600] font-Poppins text-black dark:text-white mb-4">
                    Course Overview
                </h1>
                <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'h-auto' : 'max-h-[150px] relative'}`}>
                    <p className="text-[17px] leading-7 whitespace-pre-line text-black dark:text-white opacity-90 font-Poppins">
                        {data?.description}
                    </p>
                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 w-full h-[50px] bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent"></div>
                    )}
                </div>
                <button 
                    className="text-[#37a39a] mt-3 text-[16px] font-[500] hover:underline flex items-center"
                    onClick={toggleDescription}
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
             </div>

             <div className="w-full bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                 <h1 className="text-[20px] font-[600] font-Poppins text-black dark:text-white mb-4">
                    What you will learn from this course?
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data?.benefits?.map((item: any, index: number) => (
                        <div className="w-full flex items-start" key={index}>
                            <div className="w-[20px] mr-2 mt-1 shrink-0">
                                <IoCheckmarkDoneOutline size={20} className="text-[#37a39a]" />
                            </div>
                            <p className="text-[16px] text-black dark:text-white opacity-90">{item.title}</p>
                        </div>
                    ))}
                </div>
             </div>
             
             <div className="w-full bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                 <h1 className="text-[20px] font-[600] font-Poppins text-black dark:text-white mb-4">
                    Prerequisites
                </h1>
                <div className="grid grid-cols-1 gap-3">
                    {data?.prerequisites?.map((item: any, index: number) => (
                        <div className="w-full flex items-start" key={index}>
                            <div className="w-[20px] mr-2 mt-1 shrink-0">
                                <IoCheckmarkDoneOutline size={20} className="text-[#37a39a]" />
                            </div>
                            <p className="text-[16px] text-black dark:text-white opacity-90">{item.title}</p>
                        </div>
                    ))}
                </div>
             </div>

             <div className="w-full">
                <h1 className="text-[20px] font-[600] font-Poppins text-black dark:text-white mb-3">
                    Course Content
                </h1>
                <CourseContentList
                    data={data?.courseData}
                    isDemo={true} 
                />
             </div>
        </div>

        <div className="col-span-1 800px:col-span-3 space-y-5">
           <div className="sticky top-[100px]">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
    
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-[#37a39a] opacity-10 blur-2xl"></div>

                <div className="relative z-10 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-[32px] font-Poppins font-bold text-black dark:text-white">
                                {data?.price === 0 ? "Free" : `$${data?.price}`}
                            </h1>
                            <h5 className="text-[18px] text-red-400 line-through font-medium">
                                ${data?.estimatedPrice}
                            </h5>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-center bg-red-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 px-4 py-1.5 rounded-full">
                            <MdOutlineLocalOffer className="text-green-500 mr-1.5 text-sm" />
                            <span className="text-sm font-semibold text-green-500">
                                    {discountPercentage.toFixed(0)}% OFF Limited Time
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4">
                        {isPurchased ? (
                            <Link href={`/course-access/${data._id}`} className="w-full bg-[#37a39a] hover:bg-[#2e8880] text-white py-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[#37a39a]/40 transform hover:-translate-y-1 font-Poppins font-bold text-[16px] text-center">
                                Access Course
                            </Link>
                        ) : (
                            <button onClick={()=>handleClick()} className="w-full bg-[#37a39a] hover:bg-[#2e8880] text-white py-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[#37a39a]/40 transform hover:-translate-y-1 font-Poppins font-bold text-[16px] text-center">
                                Buy Now for {data?.price === 0 ? "Free" : `$${data?.price}`}
                            </button>
                        )}
                        
                        {!isPurchased && (
                            <div className="w-full bg-transparent border-2 border-[#37a39a] hover:bg-[#37a39a] hover:text-white text-[#37a39a] py-3.5 rounded-full cursor-pointer transition-all duration-300 font-Poppins font-semibold text-[16px] text-center">
                                    Add to Cart
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
                        <BsShieldCheck size={18} className="text-[#37a39a]" />
                        <p className="text-[13px] font-medium tracking-wide">30-Day Money-Back Guarantee</p>
                    </div>
                </div>
            </div>
                
                <div className="mt-5 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
                    <p className="text-black dark:text-white pb-3 flex items-center">
                        <IoCheckmarkDoneOutline className="text-[#37a39a] mr-2 text-xl"/> Source code included
                    </p>
                    <p className="text-black dark:text-white pb-3 flex items-center">
                        <IoCheckmarkDoneOutline className="text-[#37a39a] mr-2 text-xl"/> Full lifetime access
                    </p>
                    <p className="text-black dark:text-white pb-3 flex items-center">
                        <IoCheckmarkDoneOutline className="text-[#37a39a] mr-2 text-xl"/> Certificate of completion
                    </p>
                    <p className="text-black dark:text-white pb-3 flex items-center">
                        <IoCheckmarkDoneOutline className="text-[#37a39a] mr-2 text-xl"/> Premium Support
                    </p>
                </div>
           </div>
        </div>
        
      </div>
      
      {open && (
        <div 
            id="screen" 
            onClick={handleClose} 
            className="fixed top-0 left-0 w-full h-screen z-[99999] flex items-center justify-center bg-[#00000040] backdrop-blur-sm"
        >
            <div className="w-[350px] md:w-[400px] h-auto max-h-[80vh] overflow-y-auto bg-slate-900/90 backdrop-blur-xl rounded-[20px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-[rgba(255,255,255,0.18)] p-5 relative outline-none animate-in fade-in zoom-in duration-200">
                <div className="absolute top-3 right-3 z-50">
                    <IoCloseOutline
                        size={30}
                        className="text-white cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setOpen(false)}
                    />
                </div>
                <div className="w-full mt-2">
                    {stripePromise && clientSecret && (
                        <Elements stripe={stripePromise} options={{clientSecret, appearance: appearance as any}} >
                            <CheckOutForm setOpen={setOpen} data={data} user={user}/>
                        </Elements>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;