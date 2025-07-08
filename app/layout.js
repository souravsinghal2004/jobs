import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { dark } from "@clerk/themes";
import RouteLoadingNotifier from "@/components/route-notifier";
import "./globals.css"; // ✅ must be at the top


const geist = Geist({ subsets: ['latin'] })




const inter = Inter({subsets:['latin']});
export const metadata = {
  title: "Find Job",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
     appearance={{
        baseTheme: dark,
      }}>
      <html lang="en" className="dark"> 
      <body
        className={`${geist.className} `}       >
          <RouteLoadingNotifier />
        <Header/>
        <main className=" min-h-screen ">{children}</main>
           <Toaster position="top-right" richColors />


     
      </body>
    </html>

    </ClerkProvider>
  );
}
