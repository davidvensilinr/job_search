'use client'
import Link from 'next/link'
export default function Navbar(){
    return(
        <div>
            <nav>
                <Link href='/pages/login'><button>Login/Signup</button></Link>
            </nav>
        </div>

    );
}