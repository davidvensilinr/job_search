'use client'
import Link from 'next/link'
export default function Navbar(){
    return(
        <div className="p-4 bg-amber-300 mb-4">
            <nav className="flex flex-nowrap justify-center gap-20">
                <Link href='/'><button className='bg-white p-4 rounded-2xl text-black'>Home</button></Link>
                <Link href='/pages/login'><button className="bg-white p-4 rounded-2xl text-black">Login/Signup</button></Link>
            </nav>
        </div>

    );
}