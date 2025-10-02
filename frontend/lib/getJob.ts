export async function getJobs() {
  try {
    const res = await fetch("http://localhost:3000/api/jobs", {
      cache: "no-store", // prevents stale data
    });

    if (!res.ok) throw new Error("Failed to fetch jobs");

    const data = await res.json();
    return data.data; // because API returns { success, data }
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    return [];
  }
}
