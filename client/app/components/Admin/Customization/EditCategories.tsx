import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.layout) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("Categories updated successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [layoutSuccess, error, refetch]);

  const handleCategoryChange = (id: any, value: string) => {
    setCategories((prevCategory) =>
      prevCategory.map((c) => (c._id === id ? { ...c, title: value } : c))
    );
  };

  const newCategoryHandler = () => {
    if (categories.length > 0 && categories[categories.length - 1].title === "") {
        toast.error("Category title cannot be empty");
    } else {
        setCategories((prevCategory) => [
            ...prevCategory,
            {
                _id: Date.now().toString(), 
                title: "",
            },
        ]);
    }
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
      return categories.some((c) => c.title === "");
  }

  const editCategoriesHandler = async () => {
      if(isAnyCategoryTitleEmpty(categories)){
          toast.error("Category title cannot be empty");
          return;
      }
      await editLayout({
          type: "Categories",
          categories: categories,
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[80px] pb-20 text-center">
          <h1 className="text-[25px] font-[500] font-Poppins text-black dark:text-white">
            All Categories
          </h1>
          
          <div className="mt-10 max-w-[600px] m-auto">
             {categories && categories.map((item: any, index: number) => {
                return (
                    <div className="p-3 w-full flex items-center justify-between bg-gray-100 dark:bg-slate-700/20 shadow-sm rounded-lg mb-4" key={item._id}>
                        <input
                            className="bg-transparent border-none outline-none w-full text-[20px] dark:text-white text-black font-Poppins"
                            value={item.title}
                            onChange={(e) => handleCategoryChange(item._id, e.target.value)}
                            placeholder="Enter category title..."
                        />
                        <AiOutlineDelete
                            className="dark:text-white text-black text-[18px] cursor-pointer hover:text-red-500 transition-colors ml-4"
                            onClick={() => {
                                setCategories((prevCategory) =>
                                    prevCategory.filter((i) => i._id !== item._id)
                                );
                            }}
                        />
                    </div>
                );
             })}
          </div>
          
          <br />
          
          <div className="w-full flex justify-center">
             <IoMdAddCircleOutline
                className="dark:text-white text-black text-[25px] cursor-pointer hover:scale-110 transition-transform"
                onClick={newCategoryHandler}
             />
          </div>

          <div className="w-full flex justify-center mt-10">
             <button
                className={`
                    w-[150px] h-[40px] 
                    flex items-center justify-center 
                    bg-[#37a39a] hover:bg-[#2e8b83] 
                    text-white text-[16px] font-semibold 
                    rounded-full cursor-pointer 
                    transition-all duration-300 
                    font-Poppins shadow-md
                `}
                onClick={editCategoriesHandler}
            >
                Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;