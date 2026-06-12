const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const listing = await prisma.listing.create({
        data: {
            title: "iPhone 13",
            price: 1800,
            city: "Katowice",
            category: "Elektronika",
        },
        
    })

    
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) =>{
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })