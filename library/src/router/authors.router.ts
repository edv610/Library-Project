import express from "express";
import * as authorsController from "../controller/authors.controller";
const router = express.Router();

router.post("/authors/create", authorsController.createAuthor);

router.get("/authors/all", authorsController.findAllAuthors);

router.get("/authors/details/:id", authorsController.findAuthorById);

router.put("/authors/update/:id", authorsController.updateAuthor);

router.delete("/authors/delete/:id", authorsController.deleteAuthor);

export default router;
