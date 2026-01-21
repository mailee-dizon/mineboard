"use client";
import React, { useState } from 'react'
import Image from "next/image";
import {
  Home,
  Compass,
  SquarePlus,
  Bell,
  MessageCircleMore,
  ArrowRightFromLine,
  ArrowLeftFromLine
} from "lucide-react";
import styles from "./NavBar.module.css";
import { useUI } from "@/context/UIContext";
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { isCollapsed, setIsCollapsed } = useUI();
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <button
        className={styles.collapseToggle}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ArrowRightFromLine /> : <ArrowLeftFromLine />}
      </button>

      <div 
        className={styles.navItem} 
        onClick={() => {
          router.push(`/`);
        }
        }
      >
        <Image src="/minecraftLogo.webp" alt="Logo" width={24} height={24}/>
        {!isCollapsed && <span>Mineboard</span>}
      </div>

      <div 
        className={styles.navItem} 
        onClick={() => {
          router.push(`/home`)
          }
        }
      >
        <Home/>
        {!isCollapsed && <span>Home</span>}
      </div>

      <div 
        className={styles.navItem} 
        onClick={() => 
          router.push(`/explore`)
        }
      >
        <Compass/>
        {!isCollapsed && <span>Explore</span>}
      </div>

      <div 
        className={styles.navItem} 
        onClick={() => 
          router.push(`/create`)    
      }>
        <SquarePlus />
        {!isCollapsed && <span>Create</span>}
      </div>

      <div className={styles.navItem}>
        <Bell />
        {!isCollapsed && <span>Notifications</span>}
      </div>

      <div className={styles.navItem}>
        <MessageCircleMore />
        {!isCollapsed && <span>Messages</span>}
      </div>
    </nav>
  );
}
