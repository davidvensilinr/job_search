"use client"
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import CompanyCard from "@/app/components/CompanyCard";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Job {
  id: number;
  company_name: string;
  lpa: number;
  skills: string;
  experience_needed: number;
  logo: string;
}

interface Profile {
  name: string;
  skills: string;
  experience: number;
}

export default function Recommendation() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/pages/login"); return; }
    });
    // Read profile from sessionStorage
    const stored = sessionStorage.getItem("user_profile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const getRecommendations = async () => {
    if (!profile) return;
    setLoading(true); setError(null); setSearched(true); setJobs([]);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
      const mlRes = await fetch(`${backendUrl}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: profile.skills, experience: profile.experience }),
      });

      if (!mlRes.ok) throw new Error("Could not reach the recommendation engine. Is the backend running?");
      const mlData = await mlRes.json();

      // Each recommendation already has full job data from the dataset
      const recs = mlData.recommendations; // [{dataset_index, company, lpa, skills, experience_needed}]

      // Fetch matching rows from Supabase to get logo + db id, matched by company name
      const companyNames: string[] = recs.map((r: any) => r.company);
      const { data: dbJobs, error: dbError } = await supabase
        .from("jobs")
        .select("*")
        .in("company_name", companyNames);

      if (dbError) throw dbError;

      // Merge: for each recommendation keep order, attach logo from db if available
      const merged: Job[] = recs.map((r: any, i: number) => {
        const dbMatch = dbJobs?.find((j: any) => j.company_name === r.company);
        return {
          id: dbMatch?.id ?? i,
          company_name: r.company,
          lpa: r.lpa,
          skills: r.skills,
          experience_needed: r.experience_needed,
          logo: dbMatch?.logo ?? "",
        };
      });

      setJobs(merged);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Smart Job Search</h1>
        <p className="text-slate-500 text-sm mb-8">KNN model finds the best-matched jobs based on your skills and experience.</p>

        {/* No profile state */}
        {!profile && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
            <p className="text-amber-700 font-medium mb-2">No profile found for this session</p>
            <p className="text-amber-600 text-sm mb-4">Add your skills and experience to get personalized recommendations.</p>
            <Link href="/pages/editProfile">
              <button className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                Set Up Profile
              </button>
            </Link>
          </div>
        )}

        {/* Profile summary + search trigger */}
        {profile && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-slate-500 mb-1">Searching as</p>
              <p className="font-semibold text-slate-800">{profile.name || "You"}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {profile.skills.split(",").map(s => s.trim()).filter(Boolean).map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full font-medium">{skill}</span>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-2">{profile.experience} yrs experience</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/pages/editProfile">
                <button className="px-4 py-2 text-sm border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                  Edit
                </button>
              </Link>
              <button
                onClick={getRecommendations}
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? "Searching..." : "Find My Jobs"}
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-40 text-slate-400">Finding your best matches...</div>
        )}

        {/* Results */}
        {!loading && searched && jobs.length === 0 && !error && (
          <p className="text-center py-20 text-slate-400">No matching jobs found. Try updating your skills.</p>
        )}

        {!loading && jobs.length > 0 && (
          <>
            <p className="text-sm text-slate-500 mb-4">Top {jobs.length} jobs matched your profile</p>
            <div className="flex flex-wrap gap-4">
              {jobs.map(job => (
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
          </>
        )}

        {!searched && !error && profile && (
          <p className="text-center py-20 text-slate-400">Click "Find My Jobs" to get your personalized recommendations.</p>
        )}
      </div>
    </div>
  );
}
