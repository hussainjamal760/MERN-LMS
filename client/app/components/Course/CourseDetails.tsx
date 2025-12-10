'use client'
import { useState } from 'react';
import CoursePlayer from '@/app/utils/CoursePlayer';
import CourseContentList from "./CourseContentList";

type Props = {
  data: any;
}

const CourseDetails = ({ data }: Props) => {
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <div className="w-[90%] 800px:w-[90%] m-auto py-5">
      <div className="grid grid-cols-1 800px:grid-cols-10 gap-10">
        
        <div className="col-span-1 800px:col-span-7">
          <CoursePlayer
            title={data?.name}
            videoUrl={data?.courseData[activeVideo]?.videoUrl}
          />
          
          <div className="w-full flex items-center justify-between my-5">
            <div
              className={`w-full 800px:w-[150px] min-h-[40px] rounded flex items-center justify-center cursor-pointer ${
                activeVideo === 0 ? "bg-gray-300 cursor-no-drop" : "bg-[#37a39a] text-white"
              }`}
              onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
            >
              Prev Lesson
            </div>
            
            <div
              className={`w-full 800px:w-[150px] min-h-[40px] rounded flex items-center justify-center cursor-pointer ${
                 data.courseData.length - 1 === activeVideo ? "bg-gray-300 cursor-no-drop" : "bg-[#37a39a] text-white"
              }`}
              onClick={() => setActiveVideo(
                  data && data.courseData.length - 1 === activeVideo ? activeVideo : activeVideo + 1
              )}
            >
              Next Lesson
            </div>
          </div>
          
          <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black">
            {data?.courseData[activeVideo]?.title}
          </h1>
          <br />
        </div>

        <div className="col-span-1 800px:col-span-3">
          <CourseContentList
            data={data?.courseData}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;