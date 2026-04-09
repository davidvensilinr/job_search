"use client"
import Link from 'next/link'
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const SKILL_OPTIONS = [
  "Python", "Java", "C++", "JavaScript", "TypeScript", "SQL", "HTML", "CSS",
  "React", "Node.js", "Django", "Docker", "Kubernetes", "AWS", "Azure",
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Data Science",
  "MongoDB", "PostgreSQL", "Redis", "GraphQL",
];

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setStep(2);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const handleProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0) { setError("Select at least one skill."); return; }
    // Save to sessionStorage — lives for this browser session only
    sessionStorage.setItem("user_profile", JSON.stringify({
      name,
      skills: selectedSkills.join(", "),
      experience: parseFloat(experience),
    }));
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Job Search</h1>
          <p className="text-slate-500 mt-1">{step === 1 ? "Create your account" : "Set up your profile"}</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2].map(s => (
            <div key={s} className={`h-2 rounded-full transition-all ${s === step ? "w-8 bg-indigo-600" : s < step ? "w-4 bg-indigo-300" : "w-4 bg-slate-200"}`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>
          )}

          {step === 1 && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
                {loading ? "Creating account..." : "Continue →"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleProfile} className="space-y-5">
              <p className="text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                This info is saved for your current session only and will be cleared when you close the browser.
              </p>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Skills <span className="text-slate-400 font-normal">(select all that apply)</span>
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
                {selectedSkills.length > 0 && (
                  <p className="mt-2 text-xs text-slate-400">{selectedSkills.length} selected</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
                <input type="number" required min="0" max="50" step="0.5"
                  value={experience} onChange={e => setExperience(e.target.value)}
                  placeholder="e.g. 2"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
              </div>
              <button type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
                Get Started →
              </button>
            </form>
          )}

          {step === 1 && (
            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link href="/pages/login" className="text-indigo-600 font-medium hover:underline">Login</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
