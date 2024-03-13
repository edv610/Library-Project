import db from "../database/connect";

export async function createBook({
  title,
  publiYear,
  authorId,
  publisherId,
}: {
  title: string;
  publiYear: Date;
  authorId: string;
  publisherId: string;
}) {
  let result: any;

  if (
    !title ||
    title.trim() === "" ||
    !publiYear ||
    publiYear === undefined ||
    !authorId ||
    authorId.trim() === "" ||
    !publisherId ||
    publisherId.trim() === ""
  ) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Preencha todos os campos.",
    };

    return result;
  }

  let hasLetter = isNaN(Number(authorId));

  if (hasLetter) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "ID do Autor(a) inválido, contem letras.",
    };
    return result;
  }

  hasLetter = isNaN(Number(publisherId));
  if (hasLetter) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "ID da Editora inválido, contem letras.",
    };
    return result;
  }

  const authorExists = await db.query(
    `SELECT * FROM autores WHERE autor_id = $1`,
    [authorId]
  );

  if (authorExists.rowCount !== 1) {
    result = {
      statusCode: 404,
      status: "Not Found!",
      message: "ID do autor inválido, por favor insira um válido.",
    };
    return result;
  }

  const publisherExists = await db.query(
    `SELECT * FROM editores WHERE editora_id = $1`,
    [publisherId]
  );

  if (publisherExists.rowCount !== 1) {
    result = {
      statusCode: 404,
      status: "Not Found!",
      message: "ID da editora inválido, por favor insira um válido.",
    };
    return result;
  }

  const book = await db.query(
    `insert into livros (titulo, ano_publicacao, autor_id, editora_id) values ($1, $2, $3, $4)`,
    [title, publiYear, authorId, publisherId]
  );

  if (book.rowCount === 1) {
    result = {
      status: "Livro adicionado com sucesso!",
      statusCode: 201,
      message: title,
      message2: publiYear,
      message3: authorId,
      message4: publisherId,
    };
  }
  return result;
}

export async function findAllBooks() {
  const books = await db.query(
    `SELECT 
    l.livro_id as "id", 
    l.titulo as "titulo", 
    TO_CHAR(l.ano_publicacao, 'DD-MM-YYYY') as "ano", 
    l.autor_id as "autor_id", 
    l.editora_id as "editora_id" 
    FROM livros l order by l.titulo;`
  );
  return books.rows;
}

export async function findBooksById(id: string) {
  const findBooksById = await db.query(
    `SELECT 
    l.livro_id as "id",
    l.titulo as "titulo", 
    TO_CHAR(l.ano_publicacao, 'DD-MM-YYYY') as "data", 
    a.nome as "autor", 
    e.nome as "editora"
FROM livros l
LEFT JOIN autores a ON l.autor_id = a.autor_id
LEFT JOIN editores e ON l.editora_id = e.editora_id WHERE livro_id = $1`,
    [id]
  );
  return findBooksById.rows;
}

export async function findBookRelations() {
  const books = await db.query(`SELECT 
    l.titulo as "titulo", 
    TO_CHAR(l.ano_publicacao, 'DD-MM-YYYY') as "data", 
    a.nome as "autor", 
    e.nome as "editora"
FROM livros l
LEFT JOIN autores a ON l.autor_id = a.autor_id
LEFT JOIN editores e ON l.editora_id = e.editora_id;
`);

  return books.rows;
}

export async function updateBook(
  id: string,
  {
    title,
    publiYear,
    authorId,
    publisherId,
  }: {
    title: string;
    publiYear: Date;
    authorId: string;
    publisherId: string;
  }
) {
  let result: any;

  if (
    !title ||
    title.trim() === "" ||
    !publiYear ||
    publiYear === undefined ||
    !authorId ||
    authorId.trim() === "" ||
    !publisherId ||
    publisherId.trim() === ""
  ) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Preencha todos os campos",
    };

    return result;
  }

  let hasLetter = isNaN(Number(authorId));

  if (hasLetter) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "ID do Autor(a) inválido, contem letras.",
    };
    return result;
  }

  hasLetter = isNaN(Number(publisherId));
  if (hasLetter) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "ID da Editora inválido, contem letras.",
    };
    return result;
  }

  const authorExists = await db.query(
    `SELECT * FROM autores WHERE autor_id = $1`,
    [authorId]
  );

  if (authorExists.rowCount !== 1) {
    result = {
      statusCode: 404,
      status: "Not Found!",
      message: "ID do autor inválido, por favor insira um válido.",
    };
    return result;
  }

  const publisherExists = await db.query(
    `SELECT * FROM editores WHERE editora_id = $1`,
    [publisherId]
  );

  if (publisherExists.rowCount !== 1) {
    result = {
      statusCode: 404,
      status: "Not Found!",
      message: "ID da editora inválido, por favor insira um válido.",
    };
    return result;
  }

  const updateBook = await db.query(
    `update livros set titulo = $1, ano_publicacao = $2 , autor_id = $3, editora_id = $4 where livro_id = $5`,
    [title, publiYear, authorId, publisherId, id]
  );

  if (updateBook.rowCount === 1) {
    result = {
      status: "Livro atualizada com sucesso!",
      statusCode: 200,
      message: title,
      message2: publiYear,
      message3: authorId,
      message4: publisherId,
    };
  } else {
    result = {
      status: "Not Found!",
      statusCode: 404,
      message: "Livro não encontrado.",
    };
  }

  return result;
}

export async function deleteBook(id: string) {
  const bookInformation = await db.query(
    `SELECT 
    l.livro_id as "id", 
    l.titulo as "titulo", 
    TO_CHAR(l.ano_publicacao, 'DD-MM-YYYY') as "ano", 
    l.autor_id as "autor_id", 
    l.editora_id as "editora_id" 
    FROM livros l WHERE livro_id = $1`,
    [id]
  );
  const deletedBook = await db.query(`DELETE FROM livros where livro_id = $1`, [
    id,
  ]);
  let resultDeletedBook: any;

  if (deletedBook.rowCount === 1) {
    resultDeletedBook = {
      status: "Livro deletado com sucesso!",
      statusCode: 200,
      message: bookInformation.rows,
    };
  } else {
    resultDeletedBook = {
      status: "Not Found!",
      statusCode: 404,
      message: "Livro não encontrado.",
    };
  }

  return resultDeletedBook;
}
