import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
