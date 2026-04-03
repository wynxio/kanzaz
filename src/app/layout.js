import React, { Suspense } from "react";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import Providers from "./providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Kanzaz LakshaDeep Tours And Travels",
  description:
    "Exclusive LakshaDeep Tours and Travels",
   
};

// const title = "WynTees : Buy Todays Trending Tee";

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    //   <head>
    //     <title>{title}</title>
    //     <link
    //       href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
    //       rel="stylesheet"
    //     />
    //     <Script
    //       src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    //       strategy="afterInteractive"
    //     />
    //   </head>
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >
    //     {/* <Suspense fallback={<div>Loading...</div>}> */}
    //       <Providers>{children}</Providers>
    //       <ToastContainer
    //         position="top-right"
    //         autoClose={3000}
    //         hideProgressBar={false}
    //         newestOnTop={false}
    //         closeOnClick
    //         rtl={false}
    //         pauseOnFocusLoss
    //         draggable
    //         pauseOnHover
    //         theme="colored"
    //       />
    //     {/* </Suspense> */}
    //   </body>
    // </html>
    
 
<html lang="en">
<head>
  <meta charSet="UTF-8"></meta>
  <title>Kanzas</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

   
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>

  
</head>
<body>

  <div className="coming-soon">
    <img src="https://www.kanzastours.com/kanlogo.png" style={{maxWidth:'80%'}} />
    <h1>🚀 Coming Soon</h1>
    <p>We are working hard to launch something amazing. Stay tuned!</p>
    <div className="pulse"></div>
  </div>

</body>
</html>


  );
}
