import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Taller",
  description: "Administrador de taller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col gap-20 items-center">
                <div className="flex flex-col gap-1 max-w-10xl p-0">
                  {children}
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
