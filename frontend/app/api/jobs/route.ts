import prisma from "@/lib/prisma";
export default async function GET(){
try{
    const jobs=prisma.jobs.findMany();
    console.log(jobs);
    return Response.json(jobs);
}
catch(error){
    console.error("Error fetching contents: ",error);
    return Response.json({error:"failed"},{status:500});
}
}