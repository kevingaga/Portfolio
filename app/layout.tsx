import type { Metadata } from "next";
import { Epilogue, JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Providers from "./providers";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Gwenaël LIGER — Data Analyst",
  description:
    "Portfolio of Gwenaël LIGER, Data Analyst specializing in data governance, automation and visualization. Ex Air France, Sanofi, Decathlon.",
  keywords: [
    "Data Analyst",
    "Data Governance",
    "Python",
    "SQL",
    "Power BI",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Gwenaël LIGER" }],
  openGraph: {
    title: "Gwenaël LIGER — Data Analyst",
    description:
      "Data Governance · Automation · Visualization / Ex Air France · Sanofi · Decathlon",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${jetbrainsMono.variable} ${lora.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <CustomCursor />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
