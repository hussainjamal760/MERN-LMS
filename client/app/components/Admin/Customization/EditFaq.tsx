// client/app/components/Admin/Customization/EditFaq.tsx
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.layout) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("FAQ updated successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [layoutSuccess, error, refetch]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q._id === id ? { ...q, active: !q.active } : { ...q, active: false }
      )
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
        active: true, // Auto-expand the new item
        _id: Date.now().toString(), // Temporary ID for frontend key
      },
    ]);
  };

  // Function to determine if a question is expanded (active)
  const isQuestionActive = (q: any) => {
      // If 'active' property exists, use it. Otherwise false.
      return q.active || false;
  }

  const handleEdit = async () => {
    // Basic validation
    if (questions.some((q) => q.question === "" || q.answer === "")) {
        toast.error("All fields are required!");
        return;
    }

    await editLayout({
      type: "FAQ",
      faq: questions,
    });
  };

  const handleDelete = (id:any) => {
     setQuestions((prev) => prev.filter((item) => item._id !== id));
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] pb-20">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <input
                        className={`w-full border-2 bg-transparent border-transparent rounded-sm p-2 text-black dark:text-white placeholder:text-gray-500 focus:border-[#37a39a] outline-none transition-all`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder={"Add your question..."}
                      />

                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6 text-black dark:text-white" />
                        ) : (
                          <HiPlus className="h-6 w-6 text-black dark:text-white" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <textarea
                        className="w-full h-auto p-2 bg-transparent border border-gray-300 dark:border-[#ffffff1c] rounded-[5px] text-black dark:text-white outline-none focus:border-[#37a39a] transition-all resize-none font-Poppins"
                        value={q.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder={"Add your answer..."}
                        rows={4}
                      />
                      <span className="flex justify-end mt-2">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>

          <div
            className="w-full flex justify-end mt-10"
          >
             <button
                className={`
                    w-[150px] h-[40px] 
                    flex items-center justify-center 
                    bg-[#37a39a] hover:bg-[#2e8b83] 
                    text-white text-[16px] font-semibold 
                    rounded-full cursor-pointer 
                    transition-all duration-300 
                    font-Poppins
                `}
                onClick={handleEdit}
            >
                Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;