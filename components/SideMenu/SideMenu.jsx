"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import SideMenuAdmin from "./SideMenuAdmin";
import SideMenuSuperAdmin from "./SideMenuSuperAdmin";
import "@/styles/sidemenu.module.css";


function SideMenu() {
  const { isSuperAdmin } = useAuth();
  
  return isSuperAdmin ? <SideMenuSuperAdmin /> : <SideMenuAdmin />;
}

export default SideMenu;
