import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { OG_IMAGE } from "@/shared/constants/og-image";
import "@/shared/styles/globals.css";

// Fontes servidas de public/fonts, sem depender do Google no build nem no navegador.
// São as versões variáveis com o recorte latino (cobre todo o português)
const inter = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../../public/fonts/jetbrains-mono-latin.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://usebookora.com.br";
const siteName = "Bookora";
const description =
  "Agendamentos online simples para salões, barbearias, clínicas e autônomos. Tenha sua página pública e receba agendamentos sem complicação.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Agendamentos simples para o seu negócio`,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  keywords: [
    "agendamento online",
    "agendamento online teste grátis",
    "sistema de agendamento online",
    "agenda online",
    "agendamento para salão",
    "agendamento para barbearia",
    "agendamento para clínica",
    "página de agendamento",
    "Bookora",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "business",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "any" },
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName,
    title: `${siteName} — Agendamentos simples para o seu negócio`,
    description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Agendamentos simples para o seu negócio`,
    description,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-fg font-sans">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
