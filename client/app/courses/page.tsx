"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer/Footer";
import { BiSearch } from "react-icons/bi";

type Props = {};

const CoursesPageContent = () => {
  const searchParams = useSearchParams();
  const searchInput = searchParams?.get("title");
  
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetHeroDataQuery("Categories", {});
  
  const [courses, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  useEffect(() => {
    if (searchInput) {
      setSearch(searchInput);
    }
  }, [searchInput]);

  useEffect(() => {
    if (data && data.courses) {
      let filteredCourses = data.courses;

      if (category !== "All") {
        filteredCourses = filteredCourses.filter(
          (item: any) => item.categories === category
        );
      }

      if (search) {
        filteredCourses = filteredCourses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setCourses(filteredCourses);
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories;

  return (
    <>
      {isLoading || isCategoriesLoading ? (
        <Loader />
      ) : (
        <>
          <Header 
            route={route} 
            setRoute={setRoute} 
            open={open} 
            setOpen={setOpen} 
            activeItem={1} 
          />
          
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title={"All Courses - Sheep Academy"}
              description={"Sheep Academy is a programming community."}
              keywords={"programming community, coding skills, expert insights, collaboration, growth"}
            />
            <br />
            
            <div className="w-full flex flex-col items-center">
              
              <div className="w-full md:w-[60%] relative mb-8">
                <div className="bg-[#05242f] bg-opacity-20 dark:bg-opacity-20 backdrop-blur-md border border-[#00000015] dark:border-[#ffffff1d] rounded-full p-2 flex items-center shadow-lg">
                  <input
                    type="search"
                    placeholder="Search for a course..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent w-full outline-none text-[#000000e6] dark:text-[#ffffffe6] px-4 font-Poppins"
                  />
                  <div className="bg-[#39c1f3] rounded-full p-2 cursor-pointer hover:bg-[#2190ff] transition-all">
                     <BiSearch className="text-white" size={20} />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-center gap-4 mb-10">
                <div
                  className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-md border shadow-sm
                    ${category === "All"
                      ? "bg-[#37a39a] border-transparent text-white" 
                      : "bg-[#05242f] bg-opacity-10 dark:bg-opacity-20 border-[#00000015] dark:border-[#ffffff1d] text-black dark:text-white hover:bg-[#37a39a] hover:text-white hover:border-transparent"
                    }`}
                  onClick={() => setCategory("All")}
                >
                  All
                </div>
                {categories &&
                  categories.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-md border shadow-sm
                        ${category === item.title
                          ? "bg-[#37a39a] border-transparent text-white" 
                          : "bg-[#05242f] bg-opacity-10 dark:bg-opacity-20 border-[#00000015] dark:border-[#ffffff1d] text-black dark:text-white hover:bg-[#37a39a] hover:text-white hover:border-transparent"
                        }`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  ))}
              </div>
            </div>

            {courses && courses.length === 0 && (
              <p className="text-center text-[18px] font-Poppins text-black dark:text-white mt-10">
                {search ? "No courses found matching your search." : "No courses found in this category. Please try another one!"}
              </p>
            )}
            
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const Page = (props: Props) => {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesPageContent />
    </Suspense>
  );
};

export default Page;