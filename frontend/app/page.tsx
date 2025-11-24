import Navbar from "./components/Navbar";
import CompanyCard from "./components/CompanyCard";
import { getJobs } from "@/lib/getJob";

export default async function Home() {
  // Fetch jobs from helper function
  const jobs = await getJobs();

  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap gap-4 p-4">
        {jobs.length === 0 && (
          <p className="text-gray-500">No jobs found.</p>
        )}

        {jobs.map((job: any) => (
          <CompanyCard
            key={job.id}
            company_name={job.company_name}
            job_role={job.job_role}
            lpa={job.lpa}
            company_description={job.company_description}
            job_description={job.job_description}
          />
        ))}
      </div>
    </div>
  );
}
