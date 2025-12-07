"use client";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiLink, BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

 const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    const updatedLinks = [...updatedData[index].links]; // Copy links array
    updatedLinks.splice(linkIndex, 1);
    updatedData[index] = { ...updatedData[index], links: updatedLinks }; // Update object
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    const updatedLinks = [...updatedData[index].links]; // Copy links array
    updatedLinks.push({ title: "", url: "" });
    updatedData[index] = { ...updatedData[index], links: updatedLinks }; // Update object
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      !item.title ||
      !item.description ||
      !item.videoUrl ||
      !item.links[0].title ||
      !item.links[0].url
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      const nextSection = activeSection + 1;
      setActiveSection(nextSection);

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${nextSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const handlePrev = () => {
    setActive(active - 1);
  };

  const handleNext = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c817] p-4 rounded-md shadow-sm border border-[#ffffff1d] ${
                showSectionInput ? "mt-10" : "mb-4"
              }`}
            >
              {showSectionInput && (
                <div className="flex w-full items-center mb-6 mt-2">
                  <div className="flex items-center w-full bg-transparent border-b border-gray-600 pb-2">
                    <input
                      type="text"
                      className={`text-[20px] ${
                        item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-full"
                      } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none placeholder-gray-400`}
                      
                      value={item.videoSection || (index === 0 ? "Untitled Section 1" : item.videoSection)}
                      
                      onChange={(e) => {
  const updatedData = [...courseContentData];
  updatedData[index] = { ...updatedData[index], videoSection: e.target.value };
  setCourseContentData(updatedData);
}}
                    />
                    <BiSolidPencil className="cursor-pointer dark:text-white text-black ml-2 text-xl" />
                  </div>
                </div>
              )}

              <div className="flex w-full items-center justify-between bg-slate-200 dark:bg-slate-900 p-3 rounded-md">
                <div className="flex items-center">
                  {isCollapsed[index] ? (
                    <p className="font-Poppins dark:text-white text-black font-medium">
                      {index + 1}. {item.title || "Untitled Video"}
                    </p>
                  ) : (
                    <p className="font-Poppins dark:text-white text-black font-medium">
                      {index + 1}. Video Details
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] text-black transition-all hover:text-red-500 ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />

                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className="dark:text-white text-black cursor-pointer transition-transform duration-300"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>

              {!isCollapsed[index] && (
                <div className="mt-4 pl-2 fade-in-animation">
                  <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                      Video Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Introduction to React"
                      className="w-full h-[40px] px-3 rounded bg-transparent border border-gray-400 dark:text-white text-black outline-none focus:border-[#37a39a] transition-colors"
                      value={item.title}
                     onChange={(e) => {
  const updatedData = [...courseContentData];
  updatedData[index] = { ...updatedData[index], title: e.target.value };
  setCourseContentData(updatedData);
}}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                      Video Url
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://xyz.com/video..."
                      className="w-full h-[40px] px-3 rounded bg-transparent border border-gray-400 dark:text-white text-black outline-none focus:border-[#37a39a] transition-colors"
                      value={item.videoUrl}
                onChange={(e) => {
  const updatedData = [...courseContentData];
  updatedData[index] = { ...updatedData[index], videoUrl: e.target.value };
  setCourseContentData(updatedData);
}}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                      Video Description
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Describe what this video is about..."
                      className="w-full p-3 rounded bg-transparent border border-gray-400 dark:text-white text-black outline-none focus:border-[#37a39a] transition-colors resize-none"
                      value={item.description}
                    onChange={(e) => {
  const updatedData = [...courseContentData];
  updatedData[index] = { ...updatedData[index], description: e.target.value };
  setCourseContentData(updatedData);
}}
                    />
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md mt-4">
                    <h5 className="dark:text-gray-200 text-gray-800 font-semibold mb-3 flex items-center">
                       <BsLink45Deg className="mr-1 text-xl"/> Resources & Links
                    </h5>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div key={linkIndex} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs dark:text-gray-400 text-gray-600">
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop text-gray-400"
                                : "cursor-pointer text-red-500"
                            } text-[18px]`}
                            onClick={() => {
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex);
                            }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                            type="text"
                            placeholder="Link Title (e.g. Source Code)"
                            className="w-full h-[35px] px-3 rounded bg-transparent border border-gray-400 dark:text-white text-black outline-none focus:border-[#37a39a] text-sm"
                            value={link.title}
                         onChange={(e) => {
  const updatedData = [...courseContentData];
  const updatedLinks = [...updatedData[index].links]; // Copy the links array
  // Copy the specific link object
  updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], title: e.target.value };
  // Assign the new links array back to the object copy
  updatedData[index] = { ...updatedData[index], links: updatedLinks };
  setCourseContentData(updatedData);
}}
                            />
                            <input
                            type="text"
                            placeholder="URL (e.g. https://github.com/...)"
                            className="w-full h-[35px] px-3 rounded bg-transparent border border-gray-400 dark:text-white text-black outline-none focus:border-[#37a39a] text-sm"
                            value={link.url}
                           onChange={(e) => {
  const updatedData = [...courseContentData];
  const updatedLinks = [...updatedData[index].links];
  updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], url: e.target.value };
  updatedData[index] = { ...updatedData[index], links: updatedLinks };
  setCourseContentData(updatedData);
}}
                            />
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-3">
                      <p
                        className="flex items-center text-sm text-[#37a39a] cursor-pointer hover:underline w-max"
                        onClick={() => handleAddLink(index)}
                      >
                        <BiLink className="mr-1" /> Add another link
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <br />
              {index === courseContentData.length - 1 && (
                <div 
                    className="flex items-center justify-center mt-2 cursor-pointer bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors p-2 rounded-md"
                    onClick={(e: any) => newContentHandler(item)}
                >
                  <AiOutlinePlusCircle className="mr-2 text-[#37a39a] text-lg" />
                  <span className="font-Poppins text-sm dark:text-white text-black">
                    Add New Video to this Section
                  </span>
                </div>
              )}
            </div>
          );
        })}

        <div
          className="flex items-center justify-center w-full mt-8 cursor-pointer h-[40px] bg-[#37a39a] hover:bg-[#2e8880] text-white rounded-md transition-all duration-300"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2 text-xl" />
          <span className="font-Poppins font-medium text-[16px]">
            Add New Section
          </span>
        </div>
      </form>

      <br />
      <div className="w-full flex items-center justify-between mt-8 pb-10">
        <div
          className="w-full md:w-[150px] h-[40px] bg-gray-500 hover:bg-gray-600 text-center text-[#fff] rounded flex items-center justify-center cursor-pointer transition duration-300"
          onClick={handlePrev}
        >
          Prev
        </div>

        <div
          className="w-full md:w-[150px] h-[40px] bg-[#37a39a] hover:bg-[#2e8880] text-center text-[#fff] rounded flex items-center justify-center cursor-pointer transition duration-300"
          onClick={handleNext}
        >
          Create
        </div>
      </div>
    </div>
  );
};

export default CourseContent;