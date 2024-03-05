import express, { Request, Response } from "express";
import * as bookModel from "../model/books.model";
const app = express();
app.use(express.json());

export async function createBook(req: Request, res: Response) {
  const book = req.body;

  try {
    const result = await bookModel.createBook(book);
    if (result.statusCode !== 201) {
      res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
      });
    } else {
      res.status(result.statusCode).json({
        Status: result.status,
        Titulo: result.message,
        Publicação: result.message2,
        ID_Autor: result.message3,
        ID_Editora: result.message4,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      message: "Erro interno no servidor",
    });
  }
}

export async function findAllBooks(req: Request, res: Response) {
  try {
    const findAllBooks = await bookModel.findAllBooks();
    res.status(200).json(findAllBooks);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", mensage: "Falha ao pesquisar Livro" });
  }
}

export async function findBooksById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const findBooksById = await bookModel.findBooksById(id);
    res.status(200).json(findBooksById);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", message: "Falha ao pesquisar Usuário" });
  }
}

export async function findBookRelations(req: Request, res: Response) {
  try {
    const findBookRelations = await bookModel.findBookRelations();
    res.status(200).json(findBookRelations);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", message: "Falha ao pesquisar relação" });
  }
}

export async function updateBook(req: Request, res: Response) {
  const book = req.body;
  const id = req.params.id;

  try {
    const updatedBook = await bookModel.updateBook(id, book);

    if (updatedBook !== 200) {
      res.status(updatedBook.statusCode).json({
        status: updatedBook.status,
        message: updatedBook.message,
      });
    } else {
      res.status(updatedBook.statusCode).json({
        Status: updatedBook.status,
        Titulo: updatedBook.message,
        Publicação: updatedBook.message2,
        ID_Autor: updatedBook.message3,
        ID_Editora: updatedBook.message4,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      message: "Erro interno no servidor",
      error: error,
    });
  }
}

export async function deleteBook(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const deletedPublisher = await bookModel.deleteBook(id);

    res.status(deletedPublisher.statusCode).json({
      status: deletedPublisher.status,
      message: deletedPublisher.message,
    });
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      message: "Erro interno no servidor",
    });
  }
}
