'use client'
import Image from 'next/image'
export default function CompanyCard(){
    return(
        <div className="bg-white rounded-2xl w-1/4 text-black p-4">
            <Image src={'/assets/image.png'} alt="google" width={100} height={100}/>
            <h3 className='font-bold'>Google</h3>
            <p className="font-bold">Salary : 40lpa</p>
            <button className='bg-amber-200 hover:bg-blue-400 w-full p-4 rounded-2xl mt-3'>Apply</button>
        </div>
    );
}