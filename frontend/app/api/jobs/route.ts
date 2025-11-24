import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$connect();
    const count = await prisma.jobs.count();
    return Response.json({ status: "OK", jobsInDB: count });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Connection failed" }, { status: 500 });
  }
}
