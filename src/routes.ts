import { Express, Request, Response } from "express";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controllers/product.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";
import validate from "./middleware/validateResource";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validate(createUserSchema), createUserHandler);

  app.post(
    "/api/session",
    validate(createSessionSchema),
    createUserSessionHandler
  ); // route to create session

  // route to get all sessions by a particular user.
  app.get('/api/sessions', requireUser, getUserSessionsHandler)

  // route to delete a session by a user.
  app.delete('/api/sessions', requireUser, deleteSessionHandler)

  // routes below for products.
  app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler)

  app.put('/api/products', [requireUser, validate(updateProductSchema)], updateProductHandler)

  app.get('/api/products', validate(getProductSchema), getProductHandler)

  app.delete(
    "/api/products",
    [requireUser, validate(deleteProductSchema)],
    deleteProductHandler
  );
};

// curl http://localhost:1331/{endpoint-name} to test the status of ur endpoint.
export default routes;
