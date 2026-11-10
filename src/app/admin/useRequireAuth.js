'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

// Redirige a /signin si no hay sesión. Devuelve el usuario actual.
export default function useRequireAuth() {
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user == null) router.replace('/signin')
  }, [user, router])

  return { user }
}
