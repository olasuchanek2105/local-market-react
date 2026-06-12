const listings = [
  {
    id: 1,
    title: "iPhone 13",
    price: 1800,
    city: "Katowice",
    category: "Elektronika",
  },
  {
    id: 2,
    title: "Biurko IKEA",
    price: 250,
    city: "Gliwice",
    category: "Meble",
  },
  {
    id: 3,
    title: "Kurtka jeansowa",
    price: 90,
    city: "Kraków",
    category: "Ubrania",
  }];


const express = require('express');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.get('/listings', (req, res) => {
    res.json(listings)
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