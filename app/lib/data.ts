import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function fetchFilteredResults(term: string){
    try {
        
        const allCities = term ? await prisma.city.findMany({
            where: {
                cityName : { contains: term}
            }
        }): await prisma.city.findMany();
        return (allCities);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }finally {
        prisma.$disconnect();
    }
}