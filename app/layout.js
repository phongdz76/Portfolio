import { Be_Vietnam_Pro, Poppins, Work_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["500", "600", "700"],
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Portfolio - Phong Nguyen",
  description:
    "Personal portfolio migrated to Next.js App Router with Tailwind CSS and reusable components.",
  icons: {
    icon: "/images/anh1-rounded.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${poppins.variable} ${workSans.variable} ${beVietnamPro.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
