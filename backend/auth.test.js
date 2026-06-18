import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app, { response } from './index.js'
import { afterEach, beforeEach } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testUser = {
    email: "janekk.kowalski@gmail.com",
    username: "janek",
    password: "xyzzyx123$"
}

describe('POST /auth/register', ()=>{



    it('powinno zwrocic status 201', async()=>{
        const response = await request(app)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(testUser)
        expect(response.status).toBe(201)
    })
})

describe('POST /auth/login', ()=>{
    beforeEach(async () => {
        await request(app)
            .post('/auth/register')
            .send(testUser)
    })
    it('powinno zwrocic status 200', async()=>{
        const response = await request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(testUser)
        expect(response.status).toBe(200)
    })
})

afterEach(async ()=> {
    await prisma.user.deleteMany({ where: { email: testUser.email } })
})