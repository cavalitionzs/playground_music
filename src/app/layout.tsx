import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 w-full h-full">
        <Navbar />
        <main className="pt-[70px] pb-[50px] overflow-y-auto sm:pt-[70px] sm:pb-[120px] md:pt-[70px] md:pb-0">
          {children}
        </main>
        <FooterWrapper />
      </body>
    </html>
  );
}
