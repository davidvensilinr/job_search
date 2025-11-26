'use client'
import Image from 'next/image';

interface CompanyCardProps {
  company_name: string;
  skills: string;
  lpa: number | string;
  experience_needed: number | string;
  logo:string;
}

export default function CompanyCard({
  logo,
  company_name,
  skills,
  experience_needed,
  lpa,

}: CompanyCardProps) {
  return (
    <div className="bg-white rounded-2xl flex-1 min-w-[calc(25%-12px)] text-black p-4">
      <Image src={logo} alt={company_name} width={100} height={100} />
      <h3 className='font-bold'>{company_name}</h3>
      <h3 className='font-bold'>Skills Required : {skills}</h3>
      <p className="text-black font-bold">Experience Needed : {experience_needed}</p>
      <p className="font-bold">Salary: {lpa} LPA</p>
      <button className='bg-amber-200 hover:bg-blue-400 w-full p-4 rounded-2xl mt-3'>
        Apply
      </button>
    </div>
  );
}
