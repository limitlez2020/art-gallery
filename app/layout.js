import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({subsets: ["latin"]})

export const metadata = {
  title: "Art Gallery",
  description: "Art Gallery for college students artworks",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${syne.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
