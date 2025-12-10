import React from 'react';
import Image from 'next/image';
import Ratings from '@/app/utils/Ratings';
import { FaQuoteRight } from 'react-icons/fa'; // Make sure to install react-icons if not present

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div className="w-full h-max pb-4 bg-white dark:bg-slate-500 dark:bg-opacity-[0.20] backdrop-blur border border-[#00000015] dark:border-[#ffffff1d] rounded-xl p-5 shadow-sm hover:shadow-[0_0_20px_rgba(33,144,255,0.15)] dark:hover:shadow-[0_0_20px_rgba(33,144,255,0.3)] transition-all duration-300 relative overflow-hidden group">
      
      <div className="absolute left-0 top-0 h-full w-[6px] bg-gradient-to-b from-[#2190ff] to-[#003975] rounded-l-xl"></div>
      
      <div className="absolute top-[-10px] right-[-10px] opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300">
         <FaQuoteRight size={100} className="text-black dark:text-white transform rotate-12" />
      </div>

      <div className="flex w-full items-center relative z-10">
        <div className="relative w-[50px] h-[50px] rounded-full border-2 border-[#2190ff] p-[2px]">
             <Image
              src={props.item.avatar}
              alt={props.item.name}
              width={50}
              height={50}
              className="w-full h-full rounded-full object-cover"
            />
        </div>
        
        <div className="pl-4 flex flex-col justify-center">
             <h5 className="text-[18px] font-semibold font-Poppins text-black dark:text-white leading-tight">
               {props.item.name}
             </h5>
             <h6 className="text-[14px] text-gray-600 dark:text-gray-400 font-Josefin">
               {props.item.profession}
             </h6>
        </div>
      </div>

      <div className="mt-2 relative z-10">
          <Ratings rating={props.item.ratings} />
      </div>

      <p className="pt-3 px-1 font-Poppins text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed relative z-10">
        "{props.item.comment}"
      </p>
    </div>
  );
};

export default ReviewCard;