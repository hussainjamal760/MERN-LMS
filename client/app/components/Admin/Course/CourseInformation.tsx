'use client'
import React, { FC, useState } from 'react'
import toast from 'react-hot-toast'

import { AiOutlineCloudUpload } from 'react-icons/ai' 

type Props = {
    courseInfo: any,
    setCourseInfo: (courseInfo: any) => void
    active: number,
    setActive: (active: number) => void
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(courseInfo.name === "" || courseInfo.description === "" || courseInfo.price === "") {
             toast.error("Please fill necessary fields")
             return;
        }
        setActive(active + 1);
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Course Name
                    </label>
                    <input
                        type="text"
                        required
                        value={courseInfo.name}
                        onChange={(e) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        placeholder="MERN Stack LMS Platform with Next 13"
                        className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#37a39a]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Course Description
                    </label>
                    <textarea
                        cols={30}
                        rows={8}
                        required
                        value={courseInfo.description}
                        onChange={(e) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                        placeholder="Write something amazing..."
                        className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#37a39a] resize-none"
                    />
                </div>

                <div className="w-full flex justify-between gap-5">
                    <div className="w-[45%]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Course Price
                        </label>
                        <input
                            type="number"
                            required
                            value={courseInfo.price}
                            onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                            placeholder="29"
                            className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#37a39a]"
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Estimated Price (Optional)
                        </label>
                        <input
                            type="number"
                            value={courseInfo.estimatedPrice}
                            onChange={(e) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                            placeholder="79"
                            className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#37a39a]"
                        />
                    </div>
                </div>

                <div className="w-full flex justify-between gap-5">
                    <div className="w-[45%]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Course Tags
                        </label>
                        <input
                            type="text"
                            required
                            value={courseInfo.tags}
                            onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                            placeholder="MERN, Next 13, Socket io, Tailwind css"
                            className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#37a39a]"
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Course Level
                        </label>
                        <input
                            type="text"
                            required
                            value={courseInfo.level}
                            onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                            placeholder="Beginner / Intermediate / Expert"
                            className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#37a39a]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Demo URL
                    </label>
                    <input
                        type="text"
                        value={courseInfo.demoUrl}
                        onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#37a39a]"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Course Thumbnail
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label 
                        htmlFor="file"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`min-h-[20vh] border-2 border-dashed flex items-center justify-center p-4 rounded-lg cursor-pointer transition-colors
                        ${dragging ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500" : "border-gray-300 dark:border-gray-700 bg-transparent"}`}
                    >
                        {courseInfo.thumbnail ? (
                            <img 
                                src={courseInfo.thumbnail} 
                                alt="Thumbnail" 
                                className="max-h-full w-full object-cover rounded-md" 
                            />
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <span className="block text-4xl mb-2">📂</span>
                                <p>Drag and drop your thumbnail here or click to browse</p>
                            </div>
                        )}
                    </label>
                </div>

                <div className="w-full flex justify-end pb-10">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full md:w-[150px] h-[40px] bg-[#37a39a] text-center text-white rounded font-semibold cursor-pointer hover:bg-[#2e8880] transition duration-300"
                    />
                </div>

            </form>
        </div>
    )
}

export default CourseInformation