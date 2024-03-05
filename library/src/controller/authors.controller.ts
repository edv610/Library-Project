import express, { Request, Response } from "express";
import * as authorsModel from "../model/authors.model";
const app = express();
app.use(express.json());

export async function createAuthor(req: Request, res: Response) {
  const author = req.body.name;
  try {
    const result = await authorsModel.createAuthor(author);

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

export async function findAllAuthors(req: Request, res: Response) {
  try {
    const findAllAuthors = await authorsModel.findAllAuthors();
    res.status(200).json(findAllAuthors);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", message: "Falha ao pesquisar Usuário" });
  }
}

export async function findAuthorById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const findAuthorById = await authorsModel.findAuthorById(id);
    res.status(200).json(findAuthorById);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", message: "Falha ao pesquisar Usuário" });
  }
}

export async function updateAuthor(req: Request, res: Response) {
  const author = req.body.name;
  const id = req.params.id;

  try {
    const result = await authorsModel.updateAuthor(id, author);

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

export async function deleteAuthor(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const deletedAuthor = await authorsModel.deleteUser(id);

    res.status(deletedAuthor.statusCode).json({
      status: deletedAuthor.status,
      message: deletedAuthor.message,
    });
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      mensagem: "Erro interno no servidor",
    });
  }
}
