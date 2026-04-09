'use client'
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const SKILL_OPTIONS = [
  "Python", "Java", "C++", "JavaScript", "TypeScript", "SQL", "HTML", "CSS",
  "React", "Node.js", "Django", "Docker", "Kubernetes", "AWS", "Azure",
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Data Science",
  "MongoDB", "PostgreSQL", "Redis", "GraphQL",
];

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/pages/login");
    });
    // Load existing session profile
    const stored = sessionStorage.getItem("user_profile");
    if (stored) {
      const p = JSON.parse(stored);
      setName(p.name ?? "");
      setExperience(p.experience?.toString() ?? "");
      setSelectedSkills(p.skills ? p.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : []);
    }
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("user_profile", JSON.stringify({
      name,
      skills: selectedSkills.join(", "),
      experience: parseFloat(experience),
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Edit Profile</h1>
        <p className="text-slate-500 text-sm mb-2">Update your skills and experience for better job matches.</p>
        <p className="text-xs text-slate-400 mb-8">Session only — this data clears when you close the browser.</p>

        {saved && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
            Profile saved for this session.
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Skills <span className="text-slate-400 font-normal">({selectedSkills.length} selected)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map(skill => (
                  <button key={skill} type="button" onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                      selectedSkills.includes(skill)
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-white border-slate-300 text-slate-600 hover:border-indigo-400"
                    }`}>
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
              <input type="number" required min="0" max="50" step="0.5"
                value={experience} onChange={e => setExperience(e.target.value)}
                placeholder="e.g. 3"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>

            <button type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
