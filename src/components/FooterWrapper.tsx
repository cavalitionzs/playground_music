"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const hideFooterOnPages = ["/contact"];

  if (hideFooterOnPages.includes(pathname)) return null;

  return <Footer />;
}
