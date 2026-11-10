import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default async function signIn(email, password) {
    try {
        const result = await signInWithEmailAndPassword(getAuth(firebase_app), email, password);
        return { result, error: null };
    } catch (error) {
        return { result: null, error };
    }
}
