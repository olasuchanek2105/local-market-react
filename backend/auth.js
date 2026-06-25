const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')
const prisma = require('./lib/prisma.js')


router.post('/register', async (req, res) =>{

    try{
        const user = req.body;
        user.password = await bcrypt.hash(user.password, 10)

        const created = await prisma.user.create({data: user})
        res.status(201).json({id: created.id, email: created.email, username: created.username})
    }
    catch(e){
        return res.status(400).json({message: "Użytkownik o podanym emailu już istnieje"})
    }

})

router.post('/login', async (req, res) =>{
    const user = req.body;
    const foundUser = await prisma.user.findUnique({where: {email:user.email}})
    
    if (!foundUser){
        return res.status(404).json({message: "Nie znaleziono użytkownika"})
    }
    if(!(await bcrypt.compare(user.password, foundUser.password))){
        return res.status(401).json({message: ""})
    }
    const token = jwt.sign({id: foundUser.id, email: foundUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.status(200).json({id: foundUser.id, email: foundUser.email, username: foundUser.username, token: token})
})

module.exports = router