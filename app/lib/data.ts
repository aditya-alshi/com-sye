import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function fetchFilteredResults(term: string){
    try {
        if(term !== ""){
            const allCities = term ? await prisma.city.findMany({
                where: {
                    cityName : { contains: term}
                }
            }): await prisma.city.findMany();
            return (allCities);
        }
        else return []
    } catch (error) {
        console.log("Error happen in this data thing " + error);
        process.exit(1);
    }finally {
        prisma.$disconnect();
    }
}