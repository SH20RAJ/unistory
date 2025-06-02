import { Inter, Calistoga } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const calistoga = Calistoga({
  variable: "--font-calistoga",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Unistory - The Social Network for College Students",
  description: "Connect, learn, and grow with verified college students. Join the exclusive social platform built for your campus community.",
  keywords: "college, students, social network, campus, university, connect",
  authors: [{ name: "Unistory Team" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo-256.png", sizes: "256x256", type: "image/png" },
      { url: "/logo-128.png", sizes: "128x128", type: "image/png" },
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Unistory",
  },
  applicationName: "Unistory",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://unistory.in"),
  openGraph: {
    type: "website",
    siteName: "Unistory",
    title: "Unistory - The Social Network for College Students",
    description: "Connect, learn, and grow with verified college students.",
    images: [{ url: "/logo-256.png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${calistoga.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
