
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

import React, { FC, useEffect, useState } from "react";

import toast from "react-hot-toast";

import { AiOutlineCamera } from "react-icons/ai";



type Props = {};



const EditHero: FC<Props> = (props) => {

  const [title, setTitle] = useState("");

  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {

    refetchOnMountOrArgChange: true,

  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();



  useEffect(() => {

    if (data && data.layout) {

      setTitle(data.layout.banner.title);

      setSubTitle(data.layout.banner.subTitle);

    }

  }, [data]);



  useEffect(() => {

    if (isSuccess) {

      toast.success("Hero updated successfully!");

      refetch();

    }

    if (error) {

      if ("data" in error) {

        const errorData = error as any;

        toast.error(errorData.data.message);

      }

    }

  }, [isSuccess, error, refetch]);



  const handleUpdate = async (e: any) => {

    if(!title || !subTitle ){

        toast.error("All fields are required");

        return;

    }

    await editLayout({

      type: "Banner",

      title,

      subTitle,

    });

  };



 



  return (

    <div className="w-full flex flex-col items-center justify-center min-h-screen pb-20 bg-gray-50 dark:bg-[#0e1329]">

   



      <div className="w-[90%] md:w-[60%] flex flex-col items-center gap-8 mt-8">

        <div className="w-full space-y-2">

            <label className="block text-lg font-semibold text-black dark:text-white font-Poppins">

                Hero Title

            </label>

            <textarea

                className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-xl text-center resize-none outline-none text-black dark:text-white focus:border-[#37a39a] transition-colors duration-300 placeholder:text-gray-400 font-Poppins"

                rows={2}

                placeholder="Main Title for your platform..."

                value={title}

                onChange={(e) => setTitle(e.target.value)}

            />

        </div>

       

        <div className="w-full space-y-2">

            <label className="block text-lg font-semibold text-black dark:text-white font-Poppins">

                Hero Subtitle

            </label>

            <textarea

                className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-base text-center resize-none outline-none text-black dark:text-white focus:border-[#37a39a] transition-colors duration-300 placeholder:text-gray-400 font-Poppins"

                rows={4}

                placeholder="Short description or slogan..."

                value={subTitle}

                onChange={(e) => setSubTitle(e.target.value)}

            />

        </div>



        <button

          className={`

            w-[200px] h-[45px] mt-4

            flex items-center justify-center

            bg-[#37a39a] hover:bg-[#2e8b83]

            text-white font-semibold text-[16px]

            rounded-full cursor-pointer

            transition-all duration-300

            shadow-md hover:shadow-lg font-Poppins

            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}

          `}

          onClick={handleUpdate}

          disabled={isLoading}

        >

          {isLoading ? "Saving..." : "Save Changes"}

        </button>

      </div>

    </div>

  );

};



export default EditHero;