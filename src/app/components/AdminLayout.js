"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
//import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./NavBar";
import useAppStore from "../store/useStore";
import { useRouter } from "next/navigation";


import "react-toastify/dist/ReactToastify.css";
import "../Styles/adminpanel.css"

let title = "Wyntees Admin Portal";

export const metadata = {
  title: title,
  description: `Wyntees Admin Portal : Manage Products and Messages`,
};

export const AdminLayout = ({ children }) => {
  const router = useRouter();
  const isLogined = useAppStore((state) => state.isLogined);

  useEffect(() => {
    if (!isLogined) {
      router.push("/manageaccountadmin/adminlogin");
    }
  }, [isLogined, router]);

  return (
    <>
        {isLogined && (
          <div>
            
              <NavBar />
              {children}
             
            
          </div>
        )}
     </>
  );
};
