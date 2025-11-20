'use client'
import Image from "next/image";
import Navbar from "./components/Navbar"
import CompanyCard from "./components/CompanyCard";
export default function Home() {
  return (
    <div>
      
      <h1 className="text-center">Job Search</h1>
      <Navbar/>
      <CompanyCard/>
    </div>
  );
}
