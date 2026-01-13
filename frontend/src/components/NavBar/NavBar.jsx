"use client";

import Link from "next/link";
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

export default function NavBar() {
  const { isCollapsed, setIsCollapsed } = useUI();

  return (
    <nav className={styles.navbar}>
      <button
        className={styles.collapseToggle}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ArrowRightFromLine /> : <ArrowLeftFromLine />}
      </button>

      <Link href="/" className={styles.navItem}>
        <Image src="/minecraftLogo.webp" alt="Logo" width={24} height={24} />
        {!isCollapsed && <span>Mineboard</span>}
      </Link>

      <Link href="/" className={styles.navItem}>
        <Home />
        {!isCollapsed && <span>Home</span>}
      </Link>

      <Link href="/explore" className={styles.navItem}>
        <Compass />
        {!isCollapsed && <span>Explore</span>}
      </Link>

      <Link href="/create" className={styles.navItem}>
        <SquarePlus />
        {!isCollapsed && <span>Create</span>}
      </Link>

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
