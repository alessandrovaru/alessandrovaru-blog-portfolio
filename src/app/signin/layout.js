import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Iniciar sesión",
  robots: { index: false, follow: false },
};

export default function SignInLayout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
