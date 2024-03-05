import express from "express";
import * as userController from "../controller/user.controller";
const router = express.Router();

router.post("/user/create", userController.createUser);

router.get("/user/all", userController.findAllUsers);

router.get("/user/details/:id", userController.findUserById);

router.put("/user/update/:id", userController.updateUserPassword);

router.delete("/user/delete/:id", userController.deleteUser);

export default router;
