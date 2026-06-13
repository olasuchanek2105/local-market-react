const express = require('express');
const cors = require('cors')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

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
    await prisma.listing.create({data: newListing})
    res.status(201).send("Udało się utworzyć ogłoszenie")
})

app.listen(port, () => {
console.log("Example app")
})