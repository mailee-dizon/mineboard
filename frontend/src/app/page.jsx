'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h1>Hello poo poo</h1>
      <button onClick={() => router.push('./pages')}>Button to page</button>
    </div>
  );
}
