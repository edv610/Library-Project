import express from "express";
import * as authorsController from "../controller/authors.controller";
const router = express.Router();

router.post("/authors", authorsController.createAuthor);
router.get("/authors", authorsController.findAllAuthors);
router.get("/authors/:id", authorsController.findAuthorById);
router.put("/authors/:id", authorsController.updateAuthor);
router.delete("/authors/:id", authorsController.deleteAuthor);

export default router;
