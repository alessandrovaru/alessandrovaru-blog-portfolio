'use client'
import { useEffect, useState, createContext, useContext } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';

export const AuthContext = createContext({ user: null });

export const useAuthContext = () => useContext(AuthContext);

// Nota: esta protección es solo de interfaz. Lo que realmente impide que
// otra persona escriba datos son las reglas de Firestore/Storage
// (ver firestore.rules y storage.rules en la raíz del repo).
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Auth se inicializa solo en el navegador (no durante el build).
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(firebase_app), (currentUser) => {
            setUser(currentUser ?? null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div className="container py-5">Cargando…</div> : children}
        </AuthContext.Provider>
    );
};
