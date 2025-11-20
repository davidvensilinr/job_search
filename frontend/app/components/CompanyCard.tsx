'use client'
import Image from 'next/image'
export default function CompanyCard(){
    return(
        <div>
            <Image src={'/assets/image.png'} alt="google" width={100} height={100}/>
            <h3>Google</h3>
            <p>Salary : 40lpa</p>
            <button>Apply</button>
        </div>
    );
}