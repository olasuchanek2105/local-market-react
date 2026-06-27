const express = require('express');
const cors = require('cors')
const { z } = require('zod')
const authRouter = require('./auth')
const authMiddleware = require('./middleware/auth')
const upload = require('./middleware/upload')
const prisma = require('./lib/prisma.js');
const { ppid } = require('node:process');

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

    try{
        const listings = await prisma.listing.findMany()
        res.json(listings)
    }
    catch(e){
        res.status(500).json({message: "Błąd serwera"});
    }

})

app.get('/listings/:id', async(req, res) => {

    try{
        const params = req.params
        const listing = await prisma.listing.findUnique({
            where: {id: Number(params.id)}
        })
        if (!listing){
            return res.status(404).json({message: "Nie znaleziono ogłoszenia"});
        }
        res.status(200).json(listing)

    }
    catch(e){
        res.status(500).json({message: "Błąd serwera"})
    }

})


app.get('/user/me', authMiddleware , async(req, res) => {
    try{
        const user = await prisma.user.findUnique({
            where: {id: req.user.id},
            select: { id: true, email: true, username: true, listings: true }
        })

        if (!user){
            return res.status(404).json({message: "Nie znaleziono użytkownika"});
        }
        res.status(200).json(user)
    }
    catch(e){
        res.status(500).json({message: "Błąd serwera"})
    }

})

app.delete('/listings/:id',authMiddleware, async(req, res) =>{

    try{
        const params = req.params
        const listing = await prisma.listing.findUnique({
            where: {id: Number(params.id)}
        })
        if (!listing){
            return res.status(404).json({message: "Nie znaleziono ogłoszenia"});
        }
        if (listing.userId !== req.user.id){
            return res.status(403).json({message: "Brak dostępu"})
        }
        await prisma.listing.delete({
            where: {id: Number(params.id)}
        })
        res.status(204).send()
    }

    catch(e){
        res.status(500).json({message: "Błąd serwera"})
    }

})

app.put('/listings/:id',authMiddleware, async(req, res) =>{

    try{
        const changedListing = req.body;
        const result = ListingSchema.safeParse(changedListing)

        if(!result.success){
            return res.status(400).json({message: "Błędne dane wejściowe"})
        }

        const params = req.params
        const listing = await prisma.listing.findUnique({
            where: {id: Number(params.id)}
        })

        if (!listing){
            return res.status(404).json({message: "Nie znaleziono ogłoszenia"});
        }
        if (listing.userId !== req.user.id){
            return res.status(403).json({message: "Brak dostępu"})
        }
        await prisma.listing.update({
            where: {id: Number(params.id)},
            data: {
                ...changedListing
            }
        })
        res.status(204).send()
    }

    catch(e){
        res.status(500).json({message: "Błąd serwera"})
    }

})

app.post('/listings/add', authMiddleware, upload.single('image'), async (req, res) => {


    try{
        const newListing = req.body;

        const result = ListingSchema.safeParse(newListing)

        if(!result.success){
            return res.status(400).json({message: "Błędne dane wejściowe"})
        }

        const created = await prisma.listing.create({
            data:{
                ...newListing,
                price: Number(newListing.price),
                userId: req.user.id,
                imageUrl: req.file ? req.file.path : null
            }})
        res.status(201).json(created)

    }
    catch(e){
        console.error(e)
        res.status(500).json({message: "Błąd serwera"})
    }

})



module.exports = app