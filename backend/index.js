const express = require('express');
const cors = require('cors')
const { z } = require('zod')
const { PrismaClient } = require('@prisma/client');
const { title } = require('node:process');
const prisma = new PrismaClient()
const authRouter = require('./auth')


const app = express();
const port = 3000;

// zod
const ListingSchema = z.object({
    title: z.string().min(1),
    price: z.coerce.number(),
    city: z.string().min(1),
    category: z.string().min(1)
})


app.use(cors());
app.use(express.json())
app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.get('/listings', async (req, res) => {
    res.json(await prisma.listing.findMany())
})

app.get('/listings/:id', async(req, res) => {

    const params = req.params
    const listing = await prisma.listing.findUnique({
        where: {id: Number(params.id)}
    })
    if (!listing){
        return res.status(404).json({message: "Nie znaleziono ogłoszenia"});
    }
    res.json(listing)
        
})

app.post('/listings/add', async (req, res) => {
    const newListing = req.body;

    const result = ListingSchema.safeParse(newListing)

    if(!result.success){
        return res.status(400).json({message: "Błędne dane wejściowe"})
    }

    const created = await prisma.listing.create({data: newListing})
    res.status(201).json(created)

})

module.exports = app