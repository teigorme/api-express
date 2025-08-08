import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/main";

describe("Products routes", () => {
        const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNTFlNmI2OS0xODZkLTRhMGQtYTM3Ni0wMzhmMTA5ZWYzNDQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTc1NDY3MzE0MywiZXhwIjoxNzU0Njc0OTQzfQ.i5xJxh9p4rSq6UjzbuQ9iBkLTOOPAS7Qqfp3ZaEjJlI";

        const newProduct = {
                name: "Test Product",
                price: 99.9,
                description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
                stock: 6,
        };

        it("POST /products creates a new product", async () => {
                const response = await request(app)
                        .post("/api/products")
                        .set("Authorization", `Bearer ${token}`)
                        .send(newProduct);
                expect(response.status).toBe(201);
        });

        it("POST /products try create product with no token jwt", async () => {
                const response = await request(app)
                        .post("/api/products")
                        .send(newProduct);
                expect(response.status).toBe(401);
        });

        it("GET /products get all products", async () => {
                const response = await request(app).get("/api/products");

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("items");
                expect(Array.isArray(response.body.items)).toBe(true);
        });
});
