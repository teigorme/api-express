import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { routes } from "@/src/routes/routes";
import { errorHandler } from "@/src/middlewares/error.middleware";
import { notFoundHandler } from "@/src/middlewares/not-found.middleware";
import { openApiSpec } from "@/src/docs/swagger";
import { env } from "@/src/shared/env";

const PORT = env.PORT;
const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(morgan("combined"));

app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.get("/api/docs.json", (_, res) => {
  res.json(openApiSpec);
});
app.get("/", (_, response) => {
  response.json({
    message: "Welcome to my simple API with Express and Typescript",
  });
});
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/docs`);
});

export default app;
