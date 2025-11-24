'use client'
import Image from 'next/image';

interface CompanyCardProps {
  company_name: string;
  job_role: string;
  lpa: number | string;
  company_description: string;
  job_description: string;
}

export default function CompanyCard({
  company_name,
  job_role,
  lpa,
  company_description,
  job_description
}: CompanyCardProps) {
  return (
    <div className="bg-white rounded-2xl w-1/4 text-black p-4">
      <Image src={'/assets/image.png'} alt={company_name} width={100} height={100} />
      <h3 className='font-bold'>{company_name}</h3>
      <h3 className='font-bold'>{company_description}</h3>
      <p className="text-gray-600">{job_role}</p>
      <p className="text-gray-600">{job_description}</p>
      <p className="font-bold">Salary: {lpa} LPA</p>
      <button className='bg-amber-200 hover:bg-blue-400 w-full p-4 rounded-2xl mt-3'>
        Apply
      </button>
    </div>
  );
}
