import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import app from "../src/main";
import { prisma } from "../src/shared/prisma";

describe("Auth Routes", () => {
  const data = {
    name: "Test",
    email: `test+${Date.now()}@gmail.com`,
    password: "senha321",
  };

  it("POST /create-account create new user", async () => {
    const response = await request(app).post("/api/create-account").send(data);
    expect(response.status).toBe(201);
  });

  it("POST /create-account create with an existing email", async () => {
    const response = await request(app).post("/api/create-account").send(data);
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: data.email },
    });
    await prisma.$disconnect();
  });
});
