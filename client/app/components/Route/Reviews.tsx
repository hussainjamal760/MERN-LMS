"use client";
import React from 'react';
import Image from 'next/image';
import ReviewCard from '../Review/ReviewsCard';
import Lottie from 'lottie-react';
import animationData from "../../../public/Review_Animation.json"; 



export const reviews = [
    {
        name: "Sarah Jenkins",
        avatar: "/user2.jpg",
        profession: "Full Stack Developer",
        ratings: 5,
        comment: "I've tried many LMS platforms, but Sheep Academy is hands down the best. The project-based learning approach helped me land my first job as a developer within 3 months!",
    },
       {
        name: "Sarah Jenkins",
        avatar: "/user1.jpg",
        profession: "Full Stack Developer",
        ratings: 5,
        comment: "I've tried many LMS platforms, but Sheep Academy is hands down the best. The project-based learning approach helped me land my first job as a developer within 3 months!",
    },
       {
        name: "Sarah Jenkins",
        avatar: "/user3.jpg",
        profession: "Full Stack Developer",
        ratings: 5,
        comment: "I've tried many LMS platforms, but Sheep Academy is hands down the best. The project-based learning approach helped me land my first job as a developer within 3 months!",
    },
    {
        name: "David Chen",
        avatar: "/user2.jpg",
        profession: "Data Analyst",
        ratings: 4.5,
        comment: "The content quality is exceptional. Instructors explain complex concepts in a way that is easy to understand. The community support is also a huge plus.",
    },
    {
        name: "Emily Rodriguez",
        avatar: "/user3.jpg",
        profession: "UI/UX Designer",
        ratings: 5,
        comment: "What I love most is the 'learn by doing' philosophy. The assignments are challenging but rewarding. Highly recommend to anyone looking to upskill.",
    },
    {
        name: "Michael Chang",
        avatar: "/user1.jpg",
        profession: "Student",
        ratings: 5,
        comment: "Excellent value for money. Lifetime access to updated courses is a game changer. I feel confident in my skills now.",
    },
];

const Reviews = () => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto my-16">
        
        <div className="w-full text-center mb-12">
            <h3 className="text-[25px] text-black dark:text-white font-[600] font-Poppins py-2 800px:!text-[40px] leading-tight">
                Our Students Are <span className="text-gradient">Our Strength</span> <br /> 
                See What They Say About Us
            </h3>
            <p className="font-Poppins text-[16px] text-gray-600 dark:text-gray-400 mt-2 max-w-[600px] mx-auto">
                Join thousands of learners worldwide who have transformed their careers with us.
            </p>
        </div>

        <div className="w-full 800px:flex items-start gap-10">
             
            <div className="800px:w-[45%] w-full 800px:sticky 800px:top-24">
                <div className="relative w-full h-[400px] 800px:h-[600px] flex items-center justify-center">
                    <Lottie 
                        animationData={animationData} 
                        loop={true} 
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            <div className="800px:w-[55%] w-full">
               <div className="grid grid-cols-1 gap-[25px] w-full">
                    {reviews && 
                        reviews.map((i, index) => <ReviewCard item={i} key={index} />)
                    }
               </div>
            </div>

        </div>
    </div>
  );
};

export default Reviews;