const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'test@test.pl',
            username: 'testuser',
            password: await bcrypt.hash('password123', 10)
        }
    })

    await prisma.listing.createMany({
        data: [
            { title: 'iPhone 13', price: 1800, city: 'Katowice', category: 'Elektronika', userId: user.id },
            { title: 'Biurko IKEA', price: 250, city: 'Gliwice', category: 'Meble', userId: user.id },
            { title: 'Kurtka jeansowa', price: 90, city: 'Kraków', category: 'Ubrania', userId: user.id },
        ]
    })

    console.log('Seed zakończony')
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
