import { EB_Garamond, Inter, Manrope, Roboto_Slab } from "next/font/google";

export const roboto = Roboto_Slab({ subsets: ["latin"], display: "swap" });
export const inter = Inter({ subsets: ["latin"], display: "swap" });
export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-logo",
});
