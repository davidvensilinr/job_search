'use client'
import { useState } from 'react';

interface CompanyCardProps {
  company_name: string;
  skills: string;
  lpa: number | string;
  experience_needed: number | string;
  logo?: string;
}

export default function CompanyCard({ company_name, skills, experience_needed, lpa }: CompanyCardProps) {
  const [applied, setApplied] = useState(false);
  // Generate a consistent color from company name
  const colors = ['bg-indigo-100 text-indigo-700', 'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700', 'bg-rose-100 text-rose-700', 'bg-violet-100 text-violet-700', 'bg-cyan-100 text-cyan-700'];
  const colorIndex = company_name.charCodeAt(0) % colors.length;
  const avatarColor = colors[colorIndex];

  const skillList = skills?.split(',').map(s => s.trim()).filter(Boolean) ?? [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${avatarColor}`}>
          {company_name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-base">{company_name}</h3>
          <p className="text-sm text-slate-500">{experience_needed} yrs experience</p>
        </div>
        <div className="ml-auto text-right">
          <p className="font-bold text-indigo-600 text-lg">₹{lpa} LPA</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skillList.slice(0, 5).map(skill => (
          <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
            {skill}
          </span>
        ))}
        {skillList.length > 5 && (
          <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-xs rounded-full">+{skillList.length - 5} more</span>
        )}
      </div>

      <button
        onClick={() => setApplied(true)}
        disabled={applied}
        className={`mt-auto w-full py-2 font-medium text-sm rounded-xl transition-colors ${
          applied
            ? "bg-green-100 text-green-600 cursor-default"
            : "bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600"
        }`}
      >
        {applied ? "✓ Applied" : "Apply Now"}
      </button>
    </div>
  );
}
