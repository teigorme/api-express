import { Router } from "express";
import { createAccountRouter } from "@/src/routes/auth/create-account";
import { emailAndPasswordRouter } from "@/src/routes/auth/email-and-password";
import { getProductsRouter } from "@/src/routes/products/get-products";
import { createProductsRouter } from "@/src/routes/products/create-products";
import { authenticate } from "@/src/middlewares/auth.middleware";
import { getProductRouter } from "@/src/routes/products/get-product";
import { updateProductRouter } from "@/src/routes/products/update-product";
import { deleteProductRouter } from "@/src/routes/products/remove-product";
import { createOrdersRouter } from "@/src/routes/orders/create-orders";

const routes = Router();
// Routess
routes.use(createAccountRouter);
routes.use(emailAndPasswordRouter);
routes.use(getProductsRouter);

// Routes authenticated
routes.use(authenticate);

// Routes products
routes.use(createProductsRouter);
routes.use(getProductRouter);
routes.use(updateProductRouter);
routes.use(deleteProductRouter);

// Route orders
routes.use(createOrdersRouter);

export { routes };
