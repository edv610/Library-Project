import express from "express";
import * as publisherController from "../controller/publisher.controller";
const router = express.Router();

router.post("/publisher", publisherController.createPublisher);
router.get("/publisher", publisherController.findAllPublisher);
router.get("/publisher/:id", publisherController.findPublisherById);
router.put("/publisher/:id", publisherController.updatePublisher);
router.delete("/publisher/:id", publisherController.deletePublisher);

export default router;
