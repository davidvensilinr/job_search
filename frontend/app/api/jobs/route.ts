import prisma from "@/lib/prisma";
export default async function GET(){
const jobs= await prisma.jobs.findMany();
}