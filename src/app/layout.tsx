import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/shared/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
    images: [
      {
        url: "/brand/icon-512.png",
        width: 512,
        height: 512,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteName} — Agendamentos simples para o seu negócio`,
    description,
    images: ["/brand/icon-512.png"],
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
