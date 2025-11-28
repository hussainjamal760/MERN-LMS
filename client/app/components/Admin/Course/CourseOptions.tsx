import React from 'react'
import { IoMdCheckmark } from "react-icons/io"

type Props = {
    active: number,
    setActive: (active: number) => void
}

const CourseOptions = ({ active, setActive }: Props) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]

    return (
        <div>
            {options.map((option: any, index: number) => (
                <div key={index} className={`w-full flex py-5`}>
                    
                    <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"} relative`}>
                        <IoMdCheckmark className="text-[20px] text-white" />
                        
                        {index !== options.length - 1 && (
                            <div className={`absolute h-[30px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"} bottom-[-100%]`} />
                        )}
                    </div>

                    <div className={`pl-3 ${active === index ? "text-white" : "text-gray-500"} text-[16px] font-Poppins`}>
                        <h5 
                            className={`cursor-pointer ${active === index ? "text-black dark:text-white font-semibold" : "text-black dark:text-white"}`}
                            onClick={() => setActive(index)}
                        >
                            {option}
                        </h5>
                        <p className={`text-xs ${active > index ? "text-blue-500" : "text-gray-500"}`}>
                            {active > index ? "Completed" : active === index ? "In Progress" : "Pending"}
                        </p>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

export default CourseOptions