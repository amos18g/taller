import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard App",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
 
        <div className="App">
          
          <div className="SideMenuAndPageContent">
            <SideMenu/>
            <main className="PageContent">
              {children}
            </main>
          </div>
      
        </div>
      
  );
}
