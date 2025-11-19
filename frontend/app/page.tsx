'use client'
import Image from "next/image";
import Navbar from "./components/Navbar"
export default function Home() {
  return (
    <div>
      <Navbar/>
      <h1 className="text-center">Job Search</h1>
    </div>
  );
}
