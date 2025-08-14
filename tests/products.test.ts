import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import app from "../src/main";
import { generateToken } from "../src/utils/generate-token";
import { faker } from "@faker-js/faker";

describe("Products routes", () => {
  let token: string;

  beforeAll(async () => {
    token = await generateToken({
      sub: "eee8cb52-1edf-453c-9d8f-907bb0fdfc9b",
      role: "User",
    });
  });

  const data = {
    name: faker.commerce.productName(),
    price: faker.commerce.price({ max: 25000, min: 1200 }),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ max: 20, min: 2 }),
  };

  it("POST /products create a new product", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(data);
    expect(response.status).toBe(201);
  });

  it("POST /products try create product with no  jwt", async () => {
    const response = await request(app).post("/api/products").send(data);
    expect(response.status).toBe(401);
  });

  it("GET /products get all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("items");
    expect(Array.isArray(response.body.items)).toBe(true);
  });

  it("GET /products/:id get an product", async () => {
    const response = await request(app).get(
      "/api/products/11e939ac-f0c3-4b48-b8f4-e84d14a83ae2"
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("GET /products/:id get an product dont exist", async () => {
    const response = await request(app).get(
      "/api/products/11e939ac-f0c3-4b48-b8f4-e84d14a83ae1"
    );
    expect(response.status).toBe(404);
  });

  it("PATCH /products/:id update an product", async () => {
    const response = await request(app)
      .patch("/api/products/11e939ac-f0c3-4b48-b8f4-e84d14a83ae2")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: faker.commerce.productName(),
        price: faker.commerce.price({ max: 25000, min: 1200 }),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ max: 20, min: 2 }),
      });
    expect(response.status).toBe(200);
  });

  it("PATCH /products/:id update an product dont exist", async () => {
    const response = await request(app)
      .patch("/api/products/11e939ac-f0c3-4b48-b8f4-e84d14a83ae1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: faker.commerce.productName(),
        price: faker.commerce.price({ max: 25000, min: 1200 }),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ max: 20, min: 2 }),
      });
    expect(response.status).toBe(404);
  });

  it("PATCH /products/:id delete an product", async () => {
    const response = await request(app)
      .delete("/api/products/86f59fca-8e90-4c85-ace2-fc0c7be46608")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
