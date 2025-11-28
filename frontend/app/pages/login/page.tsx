"use client"
import Navbar from "@/app/components/Navbar"
import Link from 'next/link'
import {useState} from "react";
export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const login = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const res = await fetch(
                "/api/auth/login",
                {
                    method:"POST",
                    body:JSON.stringify({email,password}),
                }
            );
            const data = res.json();
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    } 
    return(
        <div>
            <Navbar/>
            <h1 className="text-center text-5xl">Login</h1>
            <form>
                <h1 className="w-full text-3xl">Email :</h1>
                <input className="w-full p-4 bg-white text-black"
                required  
                placeholder="Enter your email address"
                type="email"
                onChange={(e)=>(setEmail(e.target.value))}
                />
                <label className="text-3xl">Password :</label>
                <input
                className="w-full p-4 bg-white text-black mb-1"
                required
                placeholder="Enter your password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-amber-200 text-black hover:bg-blue-400 p-2 text-2xl">Login</button>
                <button className="w-full bg-amber-200 text-black hover:bg-blue-400 p-2 text-2xl mt-1">Continue with Google</button>
            </form>
            <p>Don&apos;t have an account? <Link href="/pages/signup">Signup</Link></p>
        </div>
    );
}