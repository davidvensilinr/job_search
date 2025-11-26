'use client'
import Link from 'next/link'
export default function Navbar(){
    return(
        <>
        <h1 className="text-center text-5xl font-bold font-sans p-3">Job Search</h1>
        <div className="p-4 bg-amber-300 mb-4">
            <nav className="flex flex-nowrap justify-center gap-20">
                <Link href='/'><button className='bg-white p-4 rounded-2xl text-black hover:bg-teal-300'>Home</button></Link>
                <Link href='/pages/login'><button className="bg-white p-4 rounded-2xl text-black hover:bg-teal-300">Login/Signup</button></Link>
                <Link href="/pages/editProfile"><button className="p-4 bg-white rounded-2xl text-black hover:bg-teal-300">Edit Profile</button></Link>
                <button className="bg-green-400 rounded-2xl p-4 text-black hover:bg-teal-300">Smart Recommendation</button>
            </nav>
        </div>
        </>

    );
}