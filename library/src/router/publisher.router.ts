import express from "express";
import * as publisherController from "../controller/publisher.controller";
const router = express.Router();

router.post("/publisher/create", publisherController.createPublisher);

router.get("/publisher/all", publisherController.findAllPublisher);

router.get("/publisher/details/:id", publisherController.findPublisherById);

router.put("/publisher/update/:id", publisherController.updatePublisher);

router.delete("/publisher/delete/:id", publisherController.deletePublisher);

export default router;
