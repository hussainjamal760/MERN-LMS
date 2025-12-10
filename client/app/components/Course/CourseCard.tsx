import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Ratings from '@/app/utils/Ratings';
import { AiOutlineUnorderedList } from 'react-icons/ai';

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
      <div className="w-full min-h-[35vh] bg-[#05242f] dark:bg-[#05242f] dark:bg-opacity-20 backdrop-blur-md border border-[#00000015] dark:border-[#ffffff1d] rounded-xl p-3 shadow-sm hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] cursor-pointer">
        
        <div className="w-full h-[200px] relative overflow-hidden rounded-lg">
          <Image
            src={item.thumbnail?.url}
            width={500}
            height={300}
            alt={item.name}
            className="rounded-lg w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-[#2190ff] text-white text-xs font-Poppins px-2 py-1 rounded-full shadow-md">
            {item.level || "Beginner"}
          </div>
        </div>

        <div className="pt-4 px-1">
          <h1 className="font-Poppins font-[600] text-[16px] text-[#fff] min-h-[50px] line-clamp-2 leading-tight">
            {item.name}
          </h1>

          <div className="w-full flex items-center justify-between pt-2 border-b border-[#00000015] dark:border-[#ffffff1d] pb-3">
            <Ratings rating={item.ratings} />
            <h5 className={`text-[#fff] text-sm font-[500] ${isProfile && "hidden 800px:inline"}`}>
              {item.purchased} Students
            </h5>
          </div>

          <div className="w-full flex items-center justify-between pt-3">
            <div className="flex items-end gap-2">
              <h3 className="text-[#fff] font-bold text-[18px]">
                {item.price === 0 ? "Free" : `$${item.price}`}
              </h3>
              <h5 className="text-[16px] font-medium line-through  text-red-500 dark:text-red-500 font-Poppins">
                ${item.estimatedPrice}
              </h5>
            </div>

            <div className="flex items-center gap-1 text-[#fff]">
              <AiOutlineUnorderedList size={18} className="text-[#2190ff] dark:text-[#2190ff]" />
              <h5 className="text-[14px] font-[500]">
                {item.courseData?.length} Lectures
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;