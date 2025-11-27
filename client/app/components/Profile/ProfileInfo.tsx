'use client'
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import { AiOutlineCamera } from 'react-icons/ai';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';

type Props = {
    avatar: string | null;
    user: any
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const currentAvatarUrl = user?.avatar?.url || avatar || "/default-avatar.png";
    const [updateAvatar , {isSuccess ,error}] = useUpdateAvatarMutation()
    const [editProfile , {isSuccess:success ,error:updateError}] = useEditProfileMutation()
    const [name, setName] = useState(user?.name || "");
    const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
    const [loadUser, setLoadUser] = useState(false)
    const {} = useLoadUserQuery(undefined , {skip : loadUser ? false : true})

    const previewUrl = newAvatarFile ? URL.createObjectURL(newAvatarFile) : currentAvatarUrl;

    const imageHandler = async (e:any)=>{

        const file = e.target.files?.[0];
        const fileReader = new FileReader()
        
        fileReader.onload = () =>{
            if(fileReader.readyState === 2){
                const avatar = fileReader.result
                updateAvatar(avatar)
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
      if(isSuccess || success){
        setLoadUser(true)
      }
      if(error || updateError){
        console.log(error);
      }
      if(success){
        toast.success("Profile updated successfully!")
      }
    }, [isSuccess , error , success, updateError])
    
    
    const handleSubmit =async (e:any) => {
        e.preventDefault();
        if(name !== ""){
            await editProfile({
                name:name,
                email:user.email
            })
        }
    }

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2">
                Personal Information
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="flex items-center space-x-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                        <Image
                            src={previewUrl}
                            alt="Current Profile Avatar"
                            width={120}
                            height={120}
                            className="transition-opacity duration-300"
                        />
                    </div>
                    
                    <div>
                        <input 
                            type="file" 
                            name="avatar" 
                            id="avatar-upload" 
                            className="hidden" 
                            onChange={imageHandler}
                            accept="image/png,image/jpg,image/jpeg"
                        />
                        <label 
                            htmlFor="avatar-upload" 
                            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                        >
                            <AiOutlineCamera size={18} className="mr-2" />
                            Change Photo
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your full name"
                            className="font-family-poppins mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user?.email || "user@example.com"}
                            readOnly
                            title="Email cannot be changed"
                            className="font-family-poppins mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400 text-sm cursor-not-allowed"
                        />
                    </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="font-family-poppins w-full sm:w-auto flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ProfileInfo