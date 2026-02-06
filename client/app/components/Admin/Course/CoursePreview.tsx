import React, { FC } from 'react';
import CoursePlayer from "../../../utils/CoursePlayer";
import Ratings from "../../../utils/Ratings"; // Ensure this path is correct based on where you put the Ratings component
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
    isEdit?: boolean;
}

const CoursePreview: FC<Props> = ({ courseData, handleCourseCreate, setActive, active, isEdit }) => {
    const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;
    const discountPercentageRounded = discountPercentage.toFixed(0);

    const prevButton = () => {
        setActive(active - 1);
    }

    const createCourse = () => {
        handleCourseCreate();
    }

    return (
        <div className="w-[90%] m-auto py-5 mb-5 text-black dark:text-white">
            <div className="w-full relative">
                <div className="w-full mt-10 shadow-lg rounded-lg overflow-hidden">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}
                        key={courseData?.demoUrl}
                    />
                </div>
                
                <div className="flex items-center mt-8">
                    <h1 className="text-[25px] font-bold">
                        {courseData?.price === 0 ? "Free" : `${courseData?.price}$`}
                    </h1>
                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-gray-500 dark:text-gray-400">
                        {courseData?.estimatedPrice}$
                    </h5>
                    <h4 className="pl-5 pt-1 text-[22px] font-semibold text-red-500">
                        {discountPercentageRounded}% Off
                    </h4>
                </div>

                <div className="flex items-center">
                    <div className="w-[180px] h-[40px] my-3 flex items-center justify-center rounded-[50px] bg-[crimson] cursor-not-allowed text-[#fff] font-Poppins font-[600]">
                        Buy Now {courseData?.price}$
                    </div>
                </div>

                <div className="flex items-center mt-2">
                    <input
                        type="text"
                        placeholder="Discount code..."
                        className="w-[50%] 800px:w-[60%] h-[40px] px-3 rounded-l border border-gray-400 dark:border-gray-600 bg-transparent text-black dark:text-white outline-none focus:border-blue-500"
                    />
                    <div className="w-[100px] h-[40px] flex items-center justify-center bg-[#2196f3] text-white rounded-r cursor-pointer font-semibold">
                        Apply
                    </div>
                </div>

                <ul className="mt-5 pb-3 list-disc ml-5 text-gray-700 dark:text-gray-300">
                    <li className="py-1">Source code included</li>
                    <li className="py-1">Full lifetime access</li>
                    <li className="py-1">Certificate of completion</li>
                    <li className="py-1">Premium Support</li>
                </ul>

                <div className="w-full mt-5">
                    <div className="w-full">
                        <h1 className="text-[25px] font-Poppins font-[600]">
                            {courseData?.name}
                        </h1>
                        
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <Ratings rating={0} /> 
                                <h5 className="ml-2">0 Reviews</h5>
                            </div>
                            <h5>0 Students</h5>
                        </div>
                    </div>
                </div>

                <br />
                <div className="w-full">
                    <h1 className="text-[25px] font-Poppins font-[600]">
                        What you will learn from this course?
                    </h1>
                    {courseData?.benefits?.map((item: any, index: number) => (
                        <div className="w-full flex items-start py-2" key={index}>
                            <div className="w-[15px] mr-1 mt-1">
                                <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                            </div>
                            <p className="pl-2 text-gray-700 dark:text-gray-300">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
                <br />

                <div className="w-full">
                    <h1 className="text-[25px] font-Poppins font-[600]">
                        What are the prerequisites for starting this course?
                    </h1>
                    {courseData?.prerequisites?.map((item: any, index: number) => (
                        <div className="w-full flex items-start py-2" key={index}>
                            <div className="w-[15px] mr-1 mt-1">
                                <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                            </div>
                            <p className="pl-2 text-gray-700 dark:text-gray-300">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
                <br />

                <div className="w-full">
                    <h1 className="text-[25px] font-Poppins font-[600]">
                        Course Details
                    </h1>
                    <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-gray-700 dark:text-gray-300 leading-8">
                        {courseData?.description}
                    </p>
                </div>
                <br />
                <br />

                <div className="w-full flex items-center justify-between mb-10">
                    <div
                        className="w-full 800px:w-[180px] h-[40px] flex items-center justify-center bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer hover:bg-[#2e8b83] transition duration-300"
                        onClick={() => prevButton()}
                    >
                        Prev
                    </div>
                    <div
                        className="w-full 800px:w-[180px] h-[40px] flex items-center justify-center bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer hover:bg-[#2e8b83] transition duration-300"
                        onClick={() => createCourse()}
                    >
                        {isEdit ? 'Update' : 'Create'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursePreview;