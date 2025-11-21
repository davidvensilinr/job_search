'use client'
import Image from "next/image";
import Navbar from "./components/Navbar"
import CompanyCard from "./components/CompanyCard";
export default function Home() {
  return (
    <div>
      
      
      <Navbar/>
      <div className="flex flex-nowrap gap-2">
      <CompanyCard/>
      <CompanyCard/>
      <CompanyCard/>
      <CompanyCard/>
      </div>
    </div>
  );
}
