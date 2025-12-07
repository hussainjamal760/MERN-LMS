import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props) => {
  const [image, setImage] = useState("");
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
      setImage(data.layout.banner.image?.url);
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
    if(!title || !subTitle || !image){
        toast.error("All fields are required");
        return;
    }
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen pb-20 bg-gray-50 dark:bg-[#0e1329]">
      <div className="relative">
        <div className="relative w-[150px] h-[150px] md:w-[300px] md:h-[300px] flex justify-center items-center overflow-hidden rounded-full my-4 shadow-xl border-4 border-white dark:border-[#ffffff1c] group">
            
            <input
                type="file"
                name=""
                id="banner"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />

            <label 
                htmlFor="banner" 
                className="w-full h-full absolute top-0 left-0 cursor-pointer z-20 flex flex-col items-center justify-center"
            >
                {image ? (
                    <img 
                        src={image} 
                        alt="Hero Banner" 
                        className="object-cover w-full h-full absolute top-0 left-0 z-10"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 font-medium absolute top-0 left-0 z-10">
                        No Image
                    </div>
                )}
                
                <div className="absolute bottom-10 right-10 z-30 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                    <AiOutlineCamera className="text-gray-800 dark:text-white text-[25px]" />
                </div>

                <div className="absolute inset-0 bg-black/30 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold">Change Image</span>
                </div>
            </label>
        </div>
      </div>

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