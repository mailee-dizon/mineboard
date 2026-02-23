// src/app/(main)/layout.jsx
import React from "react";
import NavBar from "@/components/NavBar/NavBar"; 
import TopBar from "@/components/TopBar/TopBar";
import { UIProvider } from "@/context/UIContext";
import MainContent from "@/components/MainContent/MainContent";
import { auth, currentUser } from "@clerk/nextjs/server";
import { API_URL } from "../../../constants/api";

export default async function MainLayout({ children }) {
  const user = await currentUser();

  return (
    <>
    <UIProvider>
        <TopBar userId={user?.id}/>
        <NavBar />
        <MainContent>
          { children }
        </MainContent>
      </UIProvider>
    </>
  );
}