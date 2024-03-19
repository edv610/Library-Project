import express from "express";
import * as bookController from "../controller/books.controller";
const router = express.Router();

router.post("/book", bookController.createBook);
router.get("/book", bookController.findAllBooks);
router.get("/book/relations", bookController.findBookRelations);
router.get("/book/:id", bookController.findBooksById);
router.put("/book/:id", bookController.updateBook);
router.delete("/book/:id", bookController.deleteBook);

export default router;
