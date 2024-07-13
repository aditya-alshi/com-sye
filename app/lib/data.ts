import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function fetchFilteredResults(){
    try {
        const allCities = await prisma.city.findMany();
        return (allCities);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }finally {
        prisma.$disconnect();
    }
}