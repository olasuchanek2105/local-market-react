import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app, { response } from './index.js'

describe('GET /listings', () => {
    it('powinno zwrocic 200', async ()=> {
        const response = await request(app)
        .get('/listings')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(response.status).toBe(200)

    })
    it('powinno zwrocic tablice', async ()=> {
        const response = await request(app)
        .get('/listings')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(response.body).toBeInstanceOf(Array)
    })
})


describe('GET /listings/:id', () => {
    it('powinno zwrocic status 200', async() =>{
        const response = await request(app)
        .get('/listings/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(response.status).toBe(200)
    })
    it('powinno zwrocic obiek z polem title', async() =>{
        const response = await request(app)
        .get('/listings/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(response.body).toHaveProperty('title')
    })
    it('powinno zwrocic status 404', async() =>{
        const response = await request(app)
        .get('/listings/999')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(response.status).toBe(404)
    })
})

const testListing = {
    title: "Test ogłoszenie",
    price: 100,
    city: "Kraków",
    category: "Elektronika"
}

describe('POST /listings/add', ()=>{
    it('powinno zwrocic status 201', async()=> {
        const response = await request(app)
        .post('/listings/add')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(testListing)
        expect(response.status).toBe(201)
    })
    it('powinno zwrocic 400 przy blednych danych', async() => {
        const response = await request(app)
        .post('/listings/add')
        .send({ title: "Test", price: "nie liczba która nie przejdzie", city: 123, category: "" })
        expect(response.status).toBe(400)
    })
})

