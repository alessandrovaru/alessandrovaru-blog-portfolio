'use client'
import {useEffect} from 'react'

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

import './styles.css'


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
  const handleCreateMixtape = () => {
    router.push("/admin/mixtapes-de-caracas/create")
  }

  useEffect(() => {
      if (user == null) router.push("/signin")
  }, [user])



  return (
    <div className='admin-container container'>
      <h1>Admin Page</h1>
      <p>Logged in as {user?.email}</p>
      <button onClick={handleCreateMandala}>Crear Mandala</button>
      <button onClick={handleCreateMixtape}>Crear Mixtape</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default page