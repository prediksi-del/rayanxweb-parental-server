import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import "@/app/globals.css";

export const metadata = {
  title: "RAYAN CONSOLE v1.37",
  description: "Secure Cloud Controller Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#05070f] antialiased">
        <AuthProvider>
          <div className="flex min-h-screen flex-col pb-20">
            <Header />
            <main className="flex-1">{children}</main>
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
