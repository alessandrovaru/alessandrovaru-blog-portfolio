'use client'
import { getAuth, signOut } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { useRouter } from 'next/navigation'
import useRequireAuth from './useRequireAuth'

import './styles.css'

const Page = () => {
  const { user } = useRequireAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(getAuth(firebase_app))
      router.push("/signin")
    } catch (error) {
      alert(error.message)
    }
  }

  if (!user) return null

  return (
    <div className='admin-container container'>
      <h1>Admin Page</h1>
      <p>Logged in as {user.email}</p>
      <button className="btn btn-dark me-2" onClick={() => router.push("/admin/mandalas/create")}>Crear Mandala</button>
      <button className="btn btn-dark me-2" onClick={() => router.push("/admin/mixtapes-de-caracas/create")}>Crear Mixtape</button>
      <button className="btn btn-outline-dark" onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default Page
