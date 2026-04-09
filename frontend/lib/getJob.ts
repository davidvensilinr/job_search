import { supabaseServer } from "./supabaseServer";

export async function getJobs() {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase.from("jobs").select("*");
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    return [];
  }
}
