import { redirect } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

type protectedProps = {
    children: React.ReactNode
}

const adminProtected = ({children}:protectedProps) => {
  const {user} = useSelector((state:any) => state.auth)
  if(user){
    const isAdmin = user?.role === "admin";
    return isAdmin ? children : redirect("/")
  }
}

export default adminProtected