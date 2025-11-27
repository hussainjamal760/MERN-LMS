import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {};

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatePassword ,{isSuccess , error}] = useUpdatePasswordMutation();

  const handleSubmit =async (event: any) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
    }else{
        await updatePassword({oldPassword , newPassword})
    }
  };

   useEffect(() => {
      if(isSuccess){
        toast.success("Password changed Successfully1")
      }
      if(error){
        if("data" in error){
            const errorData = error as any;
            toast.error(errorData.data.message)
        }
      }
    }, [isSuccess , error])
    

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2">
        Change Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
  
        <div className="grid grid-cols-1 gap-6">
            
            <div>
                <label 
                    htmlFor="old-password" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Current Password
                </label>
                <input
                    type="password"
                    id="old-password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    placeholder="Enter your current password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                />
            </div>

            <div>
                <label 
                    htmlFor="new-password" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    New Password
                </label>
                <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                />
            </div>

            <div>
                <label 
                    htmlFor="confirm-password" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Confirm New Password
                </label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Re-enter your new password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                />
            </div>
        </div>
        
        <div className="pt-4 flex justify-end">
            <button
                type="submit"
                className="w-full sm:w-auto flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
            >
                Save Password
            </button>
        </div>

      </form>
    </div>
  );
};

export default ChangePassword;