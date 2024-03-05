import "dotenv/config";
import express from "express";
import cors from "cors";

import authorsRouter from "./router/authors.router";
import publisherRouter from "./router/publisher.router";
import bookRouter from "./router/books.router";

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

app.use(authorsRouter);

app.use(publisherRouter);

app.use(bookRouter);

app.listen(port, () => {
  console.log("Running at port:", port);
});
