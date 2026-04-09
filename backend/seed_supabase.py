"""
Seed the Supabase 'jobs' table from job_dataset.csv.
Run: python seed_supabase.py
Requires: pip install supabase pandas
"""
import os
import pandas as pd
from supabase import create_client

SUPABASE_URL = "https://qazmxjpdwomyjtifiunb.supabase.co"
SUPABASE_SERVICE_ROLE = os.environ.get("SUPABASE_SERVICE_ROLE", "your-service-role-key-here")

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

df = pd.read_csv("dataset/job_dataset.csv")
df = df.where(pd.notnull(df), None)  # replace NaN with None

records = df.to_dict(orient="records")

# Insert in batches of 100
batch_size = 100
for i in range(0, len(records), batch_size):
    batch = records[i:i+batch_size]
    # Clean up keys to match table columns
    clean = []
    for r in batch:
        clean.append({
            "company_name": r.get("company_name"),
            "lpa": float(r["lpa"]) if r.get("lpa") is not None else None,
            "skills": r.get("skills"),
            "experience_needed": float(r["experience_needed"]) if r.get("experience_needed") is not None else None,
            "logo": r.get("logo"),
        })
    res = supabase.table("jobs").insert(clean).execute()
    print(f"Inserted batch {i//batch_size + 1}: {len(clean)} rows")

print("Done seeding jobs table.")
