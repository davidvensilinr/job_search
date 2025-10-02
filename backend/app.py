from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import MinMaxScaler

# -------------------------------------------------
# Load Dataset (needed to rebuild preprocessing)
# -------------------------------------------------
df = pd.read_csv("dataset/job_dataset.csv")

# Rebuild company hashing
df["company_hash"] = df["company_name"].apply(lambda x: hash(x) % 100000)

# Output hash map
output_hash_map = {
    idx: {
        "company_hash": row["company_hash"],
        "lpa": row["lpa"]
    }
    for idx, row in df.iterrows()
}

# Reverse company lookup
company_reverse_map = {
    row["company_hash"]: row["company_name"]
    for _, row in df.iterrows()
}

# -------------------------------------------------
# Skill cleaning (same as notebook)
# -------------------------------------------------
def clean_skills(text):
    parts = text.split(",")
    parts = [p.strip().lower() for p in parts]
    parts = [p for p in parts if p]
    return parts

df["skills_clean"] = df["skills"].apply(clean_skills)
df["skills_joined"] = df["skills_clean"].apply(lambda skills: " ".join(skills))

# -------------------------------------------------
# Rebuild vectorizer & transform dataset skills
# -------------------------------------------------
skill_vectorizer = CountVectorizer()
skill_vectors = skill_vectorizer.fit_transform(df["skills_joined"]).toarray()

# -------------------------------------------------
# Rebuild scaler & normalize experience
# -------------------------------------------------
exp_scaler = MinMaxScaler()
exp_normalized = exp_scaler.fit_transform(df[["experience_needed"]])
df["experience_normalised"] = exp_normalized

# Final training vectors (same as notebook)
exp_vectors = df["experience_normalised"].values.reshape(-1, 1)
knn_vectors = np.hstack((skill_vectors, exp_vectors))

# -------------------------------------------------
# Load your KNN model
# -------------------------------------------------
knn_model = joblib.load("knn_model.pkl")

# -------------------------------------------------
# FastAPI setup
# -------------------------------------------------
app = FastAPI(title="Job Recommendation API")

class JobRequest(BaseModel):
    skills: str
    experience: float

# -------------------------------------------------
# Prediction Endpoint
# -------------------------------------------------
@app.post("/recommend")
def recommend_jobs(req: JobRequest):

    # Clean & join skills
    cleaned = " ".join(clean_skills(req.skills))

    # Vectorize user skills
    user_skill_vec = skill_vectorizer.transform([cleaned]).toarray()

    # Normalize user experience
    user_exp_norm = exp_scaler.transform([[req.experience]])

    # Final user vector
    user_vec = np.hstack((user_skill_vec, user_exp_norm))

    # Get nearest neighbors
    distances, indices = knn_model.kneighbors(user_vec)

    results = []
    for idx in indices[0]:
        company_hash = output_hash_map[idx]["company_hash"]
        lpa = output_hash_map[idx]["lpa"]
        company_name = company_reverse_map[company_hash]

        results.append({
            "company": company_name,
            "lpa": lpa
        })

    return {
        "skills": req.skills,
        "experience": req.experience,
        "recommendations": results
    }
