import { Router } from "express";
import { createAccountRouter } from "@/src/routes/auth/create-account";
import { emailAndPasswordRouter } from "@/src/routes/auth/email-and-password";
import { getProductsRouter } from "@/src/routes/products/get-products";
import { createProductsRouter } from "@/src/routes/products/create-products";
import { authenticate } from "@/src/middlewares/auth.middleware";

const routes = Router();
// Routes
routes.use(createAccountRouter);
routes.use(emailAndPasswordRouter);
routes.use(getProductsRouter);

// Route authenticated
routes.use(authenticate);
routes.use(createProductsRouter);

export { routes };
