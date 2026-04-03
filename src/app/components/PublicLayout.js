"use client";

import Footer from "./Footer";
import Header from "./Header";
import '../Styles/public.css';


let title = "Wyntees : Buy Trending Tee";
export const metadata = {
  title: title,
  description: `Buy Todays Trending Premium Tee`,
};

export const PublicLayout = ({ children }) => {
  return <><Header/>{children}<Footer/></>;
};
