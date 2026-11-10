'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import signIn from "@/firebase/auth/signin";
import { useAuthContext } from '@/context/AuthContext'
import '../admin/styles.css'

function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const { user } = useAuthContext()
    const router = useRouter()

    // Si ya hay sesión iniciada, ir directo al panel.
    useEffect(() => {
        if (user) router.replace("/admin")
    }, [user, router])

    const handleForm = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        setError(null)

        const { error } = await signIn(email, password);
        setSubmitting(false)

        if (error) {
            setError('No se pudo iniciar sesión. Revisa el correo y la contraseña.')
            return
        }

        router.push("/admin")
    }

    return (<div className="wrapper container py-5">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign in</h1>
            <form onSubmit={handleForm} className="form auth-form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input className="form-control" onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" autoComplete="username" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input className="form-control" onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" autoComplete="current-password" placeholder="password" />
                </label>
                {error && <p role="alert" style={{ color: '#b00020' }}>{error}</p>}
                <button className="btn btn-dark mt-3" type="submit" disabled={submitting}>{submitting ? 'Entrando…' : 'Sign in'}</button>
            </form>
        </div>
    </div>);
}

export default Page;
