import Navbar from "./components/Navbar";
import CompanyCard from "./components/CompanyCard";
import { getJobs } from "@/lib/getJob";

export default async function Home() {
  // Fetch jobs from helper function
  const jobs = await getJobs();

  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap justify-start gap-4 p-4 w-full">
        {jobs.length === 0 && (
          <p className="text-gray-500">No jobs found.</p>
        )}

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
    </div>
  );
}
