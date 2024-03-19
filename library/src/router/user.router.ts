import express from "express";
import * as userController from "../controller/user.controller";
const router = express.Router();

router.post("/login", userController.authUserController);
router.post("/user", userController.createUserController);
router.get("/user", userController.findAllUsersController);
router.get("/user/:id", userController.findUserByIdController);
router.put("/user/:id", userController.updateUserPasswordController);
router.delete("/user/:id", userController.deleteUserController);

export default router;
