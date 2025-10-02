import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data from database
    const jobs = await prisma.jobs.findMany();

    // Log to console (server terminal)
    console.log("📌 Retrieved Jobs:", jobs);

    return NextResponse.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);

    return NextResponse.json({
      success: false,
      error: "Failed to fetch jobs",
    }, { status: 500 });
  }
}
