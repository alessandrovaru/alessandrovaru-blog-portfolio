'use client'
import React from 'react'

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'


const page = () => {

  const { user } = useAuthContext()

  const router = useRouter()

  const auth = getAuth();
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/signin")
    }).catch((error) => {
      alert(error)
    });
  }

  const handleCreateMandala = () => {
    router.push("/admin/mandalas/create")
  }

  React.useEffect(() => {
      if (user == null) router.push("/signin")
  }, [user])


  return (
    <div>
      <h1>Admin Page</h1>
      <p>Logged in as {user?.email}</p>
      <button onClick={handleCreateMandala}>Crear Mandala</button>
      <button onClick={handleSignOut}>Crear Mixtape</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default page