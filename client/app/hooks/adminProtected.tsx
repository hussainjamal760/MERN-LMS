// client/app/hooks/adminProtected.tsx
'use client'

import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader'

type ProtectedProps = {
    children: React.ReactNode
}

const AdminProtected = ({children}: ProtectedProps) => {
  const { user } = useSelector((state: any) => state.auth)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    setIsChecking(false)
    
    if (!user || user.role !== "admin") {
      redirect("/")
    }
  }, [user])

  if (isChecking) {
    return <Loader />
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return <>{children}</>
}

export default AdminProtected