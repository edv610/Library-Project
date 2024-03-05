import express, { Request, Response } from "express";
import * as publisherModel from "../model/publishers.model";
const app = express();
app.use(express.json());

export async function createPublisher(req: Request, res: Response) {
  const publisher = req.body;
  try {
    const result = await publisherModel.createPublisher(publisher);

    if (result.statusCode !== 201) {
      res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
      });
    } else {
      res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        message2: result.message2,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Falha",
      message: "Erro interno no servidor",
    });
  }
}

export async function findAllPublisher(req: Request, res: Response) {
  try {
    const findAllpublishers = await publisherModel.findAllPublishers();
    res.status(200).json(findAllpublishers);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", mensage: "Falha ao pesquisar Editora" });
  }
}

export async function findPublisherById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const findPublisherById = await publisherModel.findPublisherById(id);
    res.status(200).json(findPublisherById);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Falha!", message: "Falha ao pesquisar Usuário" });
  }
}

export async function updatePublisher(req: Request, res: Response) {
  const publisher = req.body;
  const id = req.params.id;

  try {
    const result = await publisherModel.updatePublisher(id, publisher);
    if (result.status !== 200) {
      res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        message2: result.message2,
      });
    } else {
      res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        message2: result.message2,
      });
    }
  } catch (error) {
    res.status(500).json({
      Status: "Falha",
      Mensagem: "Erro interno no servidor",
    });
  }
}

export async function deletePublisher(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const deletedPublisher = await publisherModel.deletePublisher(id);

    res.status(deletedPublisher.statusCode).json({
      Status: deletedPublisher.status,
      message: deletedPublisher.message,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Falha",
      Mensagem: "Erro interno no servidor",
    });
  }
}
