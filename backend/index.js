


const express = require('express');
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.get('/listings', async (req, res) => {
    res.json(await prisma.listing.findMany())
})

app.get('/listings/:id', (req, res) => {
    const params = req.params
    const listing = listings.find(listing => listing.id === Number(params.id))
    if (!listing) {
        return res.json({message: "Nie znaleziono ogloszenia"})
        
    }
    
    res.json(listing)
})

app.listen(port, () => {
console.log("Example app")
})