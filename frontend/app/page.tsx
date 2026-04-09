import Navbar from "./components/Navbar";
import CompanyCard from "./components/CompanyCard";
import { getJobs } from "@/lib/getJob";
import Link from "next/link";

export default async function Dashboard() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">Find your next role</h2>
          <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto">
            Browse all listings or let our AI match you with jobs based on your skills and experience.
          </p>
          <Link href="/pages/recommendation">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors">
              Try Smart Search
            </button>
          </Link>
        </div>
      </div>

      {/* Job listings */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-800">All Jobs <span className="text-slate-400 font-normal text-base">({jobs.length})</span></h3>
        </div>

        {jobs.length === 0 ? (
          <p className="text-slate-400 text-center py-20">No jobs found.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {jobs.map((job: any) => (
              <CompanyCard
                key={job.id}
                logo={job.logo}
                company_name={job.company_name}
                skills={job.skills}
                experience_needed={job.experience_needed}
                lpa={job.lpa}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
