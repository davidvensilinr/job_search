"use client"
import Link from 'next/link'
import Navbar from "@/app/components/Navbar"
export default function Login(){
    const sub =()=>{
        alert("Success");
    }
    return(
        <div>
            <Navbar/>
            <h1 className="text-center text-5xl">Signup</h1>
            <form onSubmit={sub}>
                <h1 className="w-full text-3xl">Email :</h1>
                <input className="w-full p-4 bg-white text-black"
                required  
                placeholder="Enter your email address"
                type="email"
                />
                <label className="text-3xl">Password :</label>
                <input
                className="w-full p-4 bg-white text-black mb-1"
                required
                placeholder="Enter your password"
                type="password"
                />
                <label className="text-3xl">Confirm your Password :</label>
                <input
                className="w-full p-4 bg-white text-black mb-1"
                required
                placeholder="Re-Enter your password"
                type="password"
                />
                <button type="submit" className="w-full bg-amber-200 text-black hover:bg-blue-400 p-2 text-2xl">Login</button>
                <button className="w-full bg-amber-200 text-black hover:bg-blue-400 p-2 text-2xl mt-1">Continue with Google</button>
            </form>
            <p>Already have an account? <Link href="/pages/login">Login</Link></p>
        </div>
    );
}