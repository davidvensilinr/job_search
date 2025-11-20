'use client'
import Image from "next/image";
import Navbar from "./components/Navbar"
import CompanyCard from "./components/CompanyCard";
export default function Home() {
  return (
    <div>
      
      <h1 className="text-center text-5xl font-bold font-sans p-3">Job Search</h1>
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
