import express from "express";
import * as userController from "../controller/user.controller";
const router = express.Router();

router.post("/user/create", userController.createUserController);

router.get("/user/all", userController.findAllUsersController);

router.get("/user/details/:id", userController.findUserByIdController);

router.put("/user/update/:id", userController.updateUserPasswordController);

router.delete("/user/delete/:id", userController.deleteUserController);

router.post("/login", userController.authUserController);

export default router;
