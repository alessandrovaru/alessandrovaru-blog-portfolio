'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'


const page = () => {
  const { user } = useAuthContext()

  const router = useRouter()

  React.useEffect(() => {
      if (user == null) router.push("/signin")
  }, [user])

  return (
    <div>page</div>
  )
}

export default page