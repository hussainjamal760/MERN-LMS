import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import Loader from "../Loader/Loader";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq || []);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-[90%] 800px:w-[85%] m-auto mt-[120px] mb-16">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full text-center mb-16">
            <h1 className="text-[25px] font-[700] font-Poppins text-black dark:text-white 800px:text-[40px] leading-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="font-Poppins text-[16px] text-gray-600 dark:text-gray-400 mt-2 max-w-[600px] mx-auto">
              Have questions? We have answers. Find the most common questions asked by our community below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {questions.map((q: any) => (
              <div
                key={q._id}
                className={`${
                  activeQuestion === q._id
                    ? "bg-white dark:bg-slate-700 border-[#37a39a] shadow-lg"
                    : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                } border rounded-xl p-5 transition-all duration-300 hover:shadow-md cursor-pointer h-fit`}
                onClick={() => toggleQuestion(q._id)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-[18px] font-medium text-black dark:text-white font-Poppins pr-4 select-none">
                    {q.question}
                  </h2>
                  <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#05242f] bg-opacity-10 dark:bg-opacity-20 text-[#37a39a]">
                    {activeQuestion === q._id ? (
                      <HiMinus className="text-[20px]" />
                    ) : (
                      <HiPlus className="text-[20px]" />
                    )}
                  </button>
                </div>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeQuestion === q._id ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[15px] font-Poppins text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-600 pt-4">
                    {q.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FAQ;