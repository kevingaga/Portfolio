import type { Metadata } from "next";
import { Epilogue, JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

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
    "Portfolio de Gwenaël LIGER, Data Analyst spécialisé en gouvernance data, automatisation et visualisation. Ex Air France, Sanofi, Decathlon.",
  keywords: [
    "Data Analyst",
    "Gouvernance Data",
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
      "Gouvernance data · Automatisation · Visualisation / Ex Air France · Sanofi · Decathlon",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${epilogue.variable} ${jetbrainsMono.variable} ${lora.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <CustomCursor />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
