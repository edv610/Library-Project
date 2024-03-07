import express, { Request, Response } from "express";
import * as userModel from "../model/users.model";
const app = express();
app.use(express.json());

export async function createUserController(req: Request, res: Response) {
  const user = req.body;
  try {
    const result = await userModel.createUser(user);

    res.status(result.statusCode).json({
      status: result.status,
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      message: "Erro interno no servidor",
    });
  }
}

export async function findAllUsersController(req: Request, res: Response) {
  try {
    const findAllUsers = await userModel.findAllUsers();
    res.status(200).json(findAllUsers);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", message: "Falha ao pesquisar Usuário" });
  }
}

export async function findUserByIdController(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const findUserById = await userModel.findUserById(id);
    res.status(200).json(findUserById);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", message: "Falha ao pesquisar Usuário" });
  }
}

export async function authUserController(req: Request, res: Response) {
  const user = req.body;
  try {
    const result = await userModel.authUser(user);

    res.status(result.statusCode).json({
      status: result.status,
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      message: "Erro interno no servidor",
    });
  }
}

export async function updateUserPasswordController(
  req: Request,
  res: Response
) {
  const password = req.body.password;
  const id = req.params.id;

  try {
    const result = await userModel.updateUserPassword(id, password);

    res.status(result.statusCode).json({
      status: result.status,
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      message: "Erro interno no servidor",
      erro: error,
    });
  }
}

export async function deleteUserController(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const deletedUser = await userModel.deleteUser(id);

    res.status(deletedUser.statusCode).json({
      status: deletedUser.status,
      message: deletedUser.message,
    });
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      mensagem: "Erro interno no servidor",
    });
  }
}
