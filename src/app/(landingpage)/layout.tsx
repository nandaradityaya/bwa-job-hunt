import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import I18NextProvider from "@/providers/i18NextProvider";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BWA Job Hunt",
  description: "BWA Job Hunt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.className} relative overflow-x-hidden`}>
        <I18NextProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </I18NextProvider>
      </body>
    </html>
  );
}
