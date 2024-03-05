import express from "express";
import * as bookController from "../controller/books.controller";
const router = express.Router();

router.post("/book/create", bookController.createBook);
router.get("/book/all", bookController.findAllBooks);

router.get("/book/details/:id", bookController.findBooksById);

router.get("/book/relations", bookController.findBookRelations);
router.put("/book/update/:id", bookController.updateBook);
router.delete("/book/delete/:id", bookController.deleteBook);

export default router;
