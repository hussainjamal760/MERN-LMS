'use client'
import React, { FC, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
    data: any;
    activeVideo?: number;
    setActiveVideo?: any;
    isDemo?: boolean;
}

const CourseContentList: FC<Props> = ({ data, activeVideo, setActiveVideo, isDemo }) => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());

    const videoSections: string[] = [
        ...new Set<string>(data?.map((item: any) => item.videoSection)),
    ];

    let totalCount = 0; 
    const toggleSection = (section: string) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section);
        } else {
            newVisibleSections.add(section);
        }
        setVisibleSections(newVisibleSections);
    };

    return (
        <div className={`mt-[15px] w-full ${!isDemo && 'sticky top-24 left-0 z-30'}`}>
            {videoSections.map((section: string, sectionIndex: number) => {
                const isSectionVisible = visibleSections.has(section);
                
                const sectionVideos: any[] = data.filter(
                    (item: any) => item.videoSection === section
                );

                const sectionVideoCount = sectionVideos.length;
                const sectionVideoLength = sectionVideos.reduce(
                    (totalLength: number, item: any) => totalLength + item.videoLength, 
                    0
                );

                const sectionStartIndex = totalCount;
                totalCount += sectionVideoCount;

                const sectionContentCount = sectionVideoCount;

                return (
                    <div className={`${!isDemo && 'border-b border-[#ffffff8e] pb-2'}`} key={section}>
                        <div
                            className="w-full flex justify-between items-center bg-slate-200 dark:bg-slate-900 p-3 cursor-pointer"
                            onClick={() => toggleSection(section)}
                        >
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {isSectionVisible ? (
                                        <BsChevronUp size={20} className="dark:text-white text-black" />
                                    ) : (
                                        <BsChevronDown size={20} className="dark:text-white text-black" />
                                    )}
                                </div>
                                <h2 className="text-[18px] font-[600] dark:text-white text-black">
                                    {section}
                                </h2>
                            </div>
                            <span className="text-black dark:text-white text-[14px]">
                                {sectionContentCount} Lessons ·{" "}
                                {sectionVideoLength < 60
                                    ? sectionVideoLength
                                    : (sectionVideoLength / 60).toFixed(2)}{" "}
                                {sectionVideoLength > 60 ? "hrs" : "mins"}
                            </span>
                        </div>

                        {isSectionVisible && (
                            <div className="w-full">
                                {sectionVideos.map((item: any, index: number) => {
                                    const videoIndex = sectionStartIndex + index;
                                    const contentLength = item.videoLength;

                                    return (
                                        <div
                                            className={`w-full ${
                                                activeVideo === videoIndex ? "bg-slate-300 dark:bg-slate-800" : ""
                                            } cursor-pointer transition-all p-2 pl-6 flex justify-between items-center`}
                                            key={item._id}
                                            onClick={() => isDemo ? null : setActiveVideo(videoIndex)}
                                        >
                                            <div className="flex items-start">
                                                <div>
                                                    <MdOutlineOndemandVideo
                                                        size={20}
                                                        className={`mr-2 ${
                                                            activeVideo === videoIndex ? "text-[#37a39a]" : "text-black dark:text-white"
                                                        }`}
                                                    />
                                                </div>
                                                <h1 className={`text-[16px] inline-block break-words ${
                                                    activeVideo === videoIndex ? "text-[#37a39a]" : "text-black dark:text-white"
                                                }`}>
                                                    {item.title}
                                                </h1>
                                            </div>
                                            <h5 className="text-black dark:text-white text-[14px]">
                                                {item.videoLength > 60 ? (item.videoLength / 60).toFixed(2) : item.videoLength} {item.videoLength > 60 ? "hrs" : "mins"}
                                            </h5>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CourseContentList;