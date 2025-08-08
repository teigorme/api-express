import request from 'supertest'
import { describe, it, expect, afterAll } from 'vitest'
import app from '../src/main'
import { prisma } from '../src/shared/prisma'

describe('Auth Routes', () => {
  const data = {
    name: 'Test',
    email: `test+${Date.now()}@gmail.com`,
    password: 'senha321',
  }

  it('POST /create-account criar novo usuário', async () => {
    const response = await request(app).post('/api/create-account').send(data)
    expect(response.status).toBe(201)
  })

  it('POST /create-account criar usuário com email existente', async () => {
    const response = await request(app).post('/api/create-account').send(data)
    expect(response.status).toBe(400)
  })

  it('POST /email-and-password fazer autenticação de usuário e obter novo JWT', async () => {
    const response = await request(app).post('/api/email-and-password').send(data)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('access_token')
  })

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: data.email },
    })
    await prisma.$disconnect()
  })
})
