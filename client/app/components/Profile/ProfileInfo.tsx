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
    const currentAvatarUrl = user?.avatar?.url || avatar || "/avatar.png";
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
        <div className="p-2 sm:p-4">
            <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="w-1.5 h-8 bg-blue-500 rounded-full"></span>
                Personal Information
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg ring-2 ring-blue-500/20">
                            <Image
                                src={previewUrl}
                                alt="Current Profile Avatar"
                                width={120}
                                height={120}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none">
                            <AiOutlineCamera className="text-white text-2xl" />
                        </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Profile Photo</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-xs">
                            Upload a new avatar. Recommended size 400x400px.
                        </p>
                        <div className="relative inline-block">
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
                                className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all active:scale-95"
                            >
                                <AiOutlineCamera size={18} className="text-blue-500" />
                                Change Photo
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your full name"
                            className="font-family-poppins block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-gray-900 dark:text-white transition-all text-[15px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user?.email || "user@example.com"}
                            readOnly
                            disabled
                            className="font-family-poppins block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed select-none text-[15px]"
                        />
                    </div>
                </div>
                
                <div className="pt-6 flex justify-end">
                    <button
                        type="submit"
                        className="font-family-poppins w-full sm:w-auto flex justify-center py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ProfileInfo