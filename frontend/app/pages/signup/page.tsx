"use client"
import Link from 'next/link'
import Navbar from "@/app/components/Navbar"
import {useState} from "react";
export default function Signup(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const signup = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
        const res=await fetch(
            "/api/auth/signup",
            {
                method:"POST",
                body:JSON.stringify({email,password}),
            })
        const data = await res.json();
        console.log("hi",data);
        }
        catch(error){
            console.log("error")
        }
    }
    return(
        <div>
            <Navbar/>
            <h1 className="text-center text-5xl">Signup</h1>
            <form onSubmit={(e) => signup(e)}>
                <h1 className="w-full text-3xl">Email :</h1>
                <input className="w-full p-4 bg-white text-black"
                required  
                placeholder="Enter your email address"
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                />
                <label className="text-3xl">Password :</label>
                <input
                className="w-full p-4 bg-white text-black mb-1"
                required
                placeholder="Enter your password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <label className="text-3xl">Confirm your Password :</label>
                <input
                className="w-full p-4 bg-white text-black mb-1"
                required
                placeholder="Re-Enter your password"
                type="password"
                />
                <button type="submit" className="w-full bg-amber-200 text-black hover:bg-blue-400 p-2 text-2xl">Sign Up</button>
                <button className="w-full bg-amber-200 text-black hover:bg-blue-400 p-2 text-2xl mt-1">Continue with Google</button>
            </form>
            <p>Already have an account? <Link href="/pages/login">Login</Link></p>
        </div>
    );
}