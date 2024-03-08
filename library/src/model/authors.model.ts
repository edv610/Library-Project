import db from "../database/connect";

export async function createAuthor(name: string) {
  let result: any;

  if (!name || name.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Nome do autor não fornecido ou inválido.",
    };
    return result;
  }

  const hasNumber = name.match(/(\d+)/);
  if (hasNumber) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Nome do autor contem números no nome.",
    };
    return result;
  }

  const author = await db.query(`insert into autores (nome) values ($1)`, [
    name,
  ]);

  if (author.rowCount === 1) {
    result = {
      statusCode: 201,
      status: "Autor criado com sucesso!",
      message: name,
    };
  }

  return result;
}

export async function findAllAuthors() {
  const author = await db.query(
    'SELECT a.autor_id as "id", a.nome as "nome" FROM autores a order by a.nome'
  );
  return author.rows;
}

export async function findAuthorById(id: string) {
  const findAuthorById = await db.query(
    `SELECT a.autor_id as "id", a.nome as "nome" FROM autores a WHERE a.autor_id  = $1`,
    [id]
  );
  return findAuthorById.rows;
}

export async function updateAuthor(id: string, name: string) {
  let result: any;

  if (!name || name.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Nome do autor não fornecido ou inválido.",
    };
    return result;
  }

  const hasNumber = name.match(/(\d+)/);
  if (hasNumber) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Nome do autor contem números no nome.",
    };
    return result;
  }

  const updateAuthor = await db.query(
    `UPDATE autores SET nome = $1 WHERE autor_id = $2`,
    [name, id]
  );

  if (updateAuthor.rowCount === 1) {
    result = {
      statusCode: 200,
      status: "Autor atualizado com sucesso!",
      message: name,
    };
  } else {
    result = {
      statusCode: 404,
      message: "Erro: Autor não encontrado.",
    };
  }

  return result;
}

export async function deleteUser(id: string) {
  const authorName = await db.query(
    `SELECT a.nome as "Nome" from autores a where a.autor_id = $1`,
    [id]
  );
  const deletedAuthor = await db.query(
    `DELETE FROM autores where autor_id = $1`,
    [id]
  );
  let resultDeletedAuthor: any;

  if (deletedAuthor.rowCount === 1) {
    resultDeletedAuthor = {
      status: "Autor deletado com sucesso!",
      statusCode: 200,
      message: authorName.rows,
    };
  } else {
    resultDeletedAuthor = {
      statusCode: 404,
      message: "Erro: Autor não encontrado.",
    };
  }

  return resultDeletedAuthor;
}
