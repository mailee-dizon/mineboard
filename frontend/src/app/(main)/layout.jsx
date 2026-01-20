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
  let initData = null;
  if ( user ) {
    const response = await fetch(`${API_URL}/users/id/${user.id}`);
    const data = await response.json();
    initData = data[0];
  }

  return (
    <>
    <UIProvider>
        <TopBar initialData={initData} isLogged={user?.id}/>
        <NavBar />
        <MainContent>
          { children }
        </MainContent>
      </UIProvider>
    </>
  );
}