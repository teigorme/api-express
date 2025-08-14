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
import { getMeRouter } from "@/src/routes/auth/me";

const routes = Router();
// Routes public
routes.use(createAccountRouter);
routes.use(emailAndPasswordRouter);
routes.use(getProductsRouter);
routes.use(getProductRouter);

// Routes authenticated
routes.use(authenticate);
routes.use(getMeRouter);

// Routes products
routes.use(createProductsRouter);
routes.use(updateProductRouter);
routes.use(deleteProductRouter);

// Route orders
routes.use(createOrdersRouter);

export { routes };
