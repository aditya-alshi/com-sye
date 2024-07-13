const { cities } = require('./initialData.ts');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    for(let cityName of cities){
        await prisma.city.create({
            data : cityName
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})