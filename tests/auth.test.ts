import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import app from "../src/main";
import { prisma } from "../src/shared/prisma";

describe("Auth routes", () => {
  const data = {
    name: "Test",
    email: `test+${Date.now()}@gmail.com`,
    password: "password321",
  };

  it("POST /create-account creates a new user", async () => {
    const response = await request(app).post("/api/create-account").send(data);
    expect(response.status).toBe(201);
  });

  it("POST /create-account fails when email already exists", async () => {
    const response = await request(app).post("/api/create-account").send(data);
    expect(response.status).toBe(400);
  });

  it("POST /email-and-password authenticates user and returns JWT", async () => {
    const response = await request(app)
      .post("/api/email-and-password")
      .send(data);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("access_token");
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: data.email },
    });
    await prisma.$disconnect();
  });
});
