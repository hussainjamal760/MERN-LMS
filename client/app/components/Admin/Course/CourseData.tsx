'use client'
import React, { FC } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import toast from 'react-hot-toast' 

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({ 
    benefits, 
    setBenefits, 
    prerequisites, 
    setPrerequisites, 
    active, 
    setActive 
}) => {

    const handleBenefitChange = (index: number, value: string) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
    };

    const handlePrerequisitesChange = (index: number, value: string) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    };

    const handleAddPrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };

    const handlePrev = () => {
        setActive(active - 1);
    }

    const handleNext = () => {
        if (
            benefits[benefits.length - 1]?.title === "" || 
            prerequisites[prerequisites.length - 1]?.title === ""
        ) {
            toast.error("Please fill the empty fields before proceeding.");
            return;
        }
        setActive(active + 1);
    }

    return (
        <div className="w-[80%] m-auto mt-24 block">
            
            <div>
                <label className="block text-[20px] font-Poppins text-black dark:text-white mb-2">
                    What are the benefits for students in this course?
                </label>
                <br />
                {benefits.map((benefit: any, index: number) => (
                    <input
                        key={index}
                        type="text"
                        name="Benefit"
                        placeholder="You will be able to build a full stack LMS Platform..."
                        required
                        className="my-2 block w-full rounded-md border-gray-300 p-2 border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#37a39a]"
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                    />
                ))}
                
                <div 
                    className="w-full flex items-center justify-end cursor-pointer mt-2"
                    onClick={handleAddBenefit}
                >
                    <AiOutlinePlusCircle className="mr-2 text-[#37a39a]" size={25} />
                    <span className="text-black dark:text-white font-Poppins font-medium">
                        Add Benefit
                    </span>
                </div>
            </div>

            <br />
            <br />

            <div>
                <label className="block text-[20px] font-Poppins text-black dark:text-white mb-2">
                    What are the prerequisites for starting this course?
                </label>
                <br />
                {prerequisites.map((prerequisite: any, index: number) => (
                    <input
                        key={index}
                        type="text"
                        name="prerequisites"
                        placeholder="Basic knowledge of MERN stack is required..."
                        required
                        className="my-2 block w-full rounded-md border-gray-300 p-2 border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#37a39a]"
                        value={prerequisite.title}
                        onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                    />
                ))}

                <div 
                    className="w-full flex items-center justify-end cursor-pointer mt-2"
                    onClick={handleAddPrerequisites}
                >
                    <AiOutlinePlusCircle className="mr-2 text-[#37a39a]" size={25} />
                    <span className="text-black dark:text-white font-Poppins font-medium">
                        Add Prerequisite
                    </span>
                </div>
            </div>

            <div className="w-full flex items-center justify-between mt-8 pb-10">
                <div 
                    className="w-full md:w-[150px] h-[40px] bg-gray-500 hover:bg-gray-600 text-center text-[#fff] rounded flex items-center justify-center cursor-pointer transition duration-300"
                    onClick={handlePrev}
                >
                    Prev
                </div>
                
                <div 
                    className="w-full md:w-[150px] h-[40px] bg-[#37a39a] hover:bg-[#2e8880] text-center text-[#fff] rounded flex items-center justify-center cursor-pointer transition duration-300"
                    onClick={handleNext}
                >
                    Next
                </div>
            </div>

        </div>
    )
}

export default CourseData