import React from "react";

const About = () => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-[30px] lg:text-[45px] dark:text-white text-black font-[700] tracking-tight">
          What is <span className="text-[#37a39a]">Sheep Academy?</span>
        </h1>
        
        <br />
        
        <div className="w-full font-Poppins font-[400] text-[18px]">
          <p className="pt-2 text-[18px] leading-8">
            Sheep Academy is a cutting-edge Learning Management System (LMS) designed to democratize education. 
            We believe that high-quality education should be accessible to everyone, anywhere in the world. 
            Our platform bridges the gap between passionate instructors and eager learners, creating a vibrant 
            community of growth and development.
          </p>
          
          <br />
          
          <h2 className="text-[22px] font-[600] text-[#37a39a]">Our Mission</h2>
          <p className="pt-2 text-[18px] leading-8">
            Our mission is to empower individuals to master new skills and achieve their career goals through 
            practical, hands-on courses. Whether you are looking to break into the tech industry, improve your 
            creative skills, or learn a new language, Sheep Academy provides the tools and resources you need to succeed.
          </p>
          
          <br />
          
          <h2 className="text-[22px] font-[600] text-[#37a39a]">Why Choose Us?</h2>
          <p className="pt-2 text-[18px] leading-8">
            Unlike traditional education systems, we focus on flexibility and real-world application. 
            Our courses are curated by industry experts who bring years of experience to the table. 
            With features like lifetime access, interactive quizzes, and a supportive community, 
            learning becomes an engaging and rewarding journey.
          </p>
          
          <br />
          
          <p className="pt-2 text-[18px] leading-8">
            Join us today and start your journey towards excellence. At Sheep Academy, we don't just teach; 
            we inspire.
          </p>
          
          <br />
          
          <div className="flex flex-col items-end w-full px-5">
             <span className="font-cursive text-[22px] text-[#37a39a]">
                Hussain Jamal
             </span>
             <h5 className="text-[18px] font-Poppins font-[500]">
                Founder and CEO
             </h5>
          </div>
          
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default About;