'use client'
import Link from 'next/link'
export default function Navbar(){
    return(
        <>
        <h1 className="text-center text-5xl font-bold font-sans p-3">Job Search</h1>
        <div className="p-4 bg-amber-300 mb-4">
            <nav className="flex flex-nowrap justify-center gap-20">
                <Link href='/'><button className='bg-white p-4 rounded-2xl text-black'>Home</button></Link>
                <Link href='/pages/login'><button className="bg-white p-4 rounded-2xl text-black">Login/Signup</button></Link>
                <Link href="/pages/editProfile"><button className="p-4 bg-white rounded-2xl text-black">Edit Profile</button></Link>
            </nav>
        </div>
        </>

    );
}