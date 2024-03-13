import db from "../database/connect";

export async function createPublisher({
  name,
  location,
}: {
  name: string;
  location: string;
}) {
  let result: any;

  const hasNumber = location.match(/(\d+)/);
  if (!name || name.trim() === "" || !location || location.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Nome da editora ou da cidade não fornecidos.",
    };

    return result;
  }
  if (hasNumber) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Nome da cidade contem números.",
    };
    return result;
  }

  const publisher = await db.query(
    `insert into editores (nome, localizacao) values ($1, $2)`,
    [name, location]
  );

  if (publisher.rowCount === 1) {
    result = {
      status: "Editora criada com sucesso!",
      statusCode: 201,
      message: name,
      message2: location,
    };
  }
  return result;
}

export async function findAllPublishers() {
  const publisher = await db.query(
    'SELECT e.editora_id as "id", e.nome as "nome", e.localizacao as "estado" FROM editores e order by e.nome;'
  );
  return publisher.rows;
}

export async function findPublisherById(id: string) {
  const findPublisherById = await db.query(
    `select e.editora_id as "id", e.nome as "nome", e.localizacao as "estado" from editores e where e.editora_id = $1`,
    [id]
  );
  return findPublisherById.rows;
}

export async function updatePublisher(
  id: string,
  { name, location }: { name: string; location: string }
) {
  let result: any;

  const hasNumber = location.match(/(\d+)/);
  if (!name || name.trim() === "" || !location || location.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Nome da editora ou da cidade não fornecidos.",
    };

    return result;
  }
  if (hasNumber) {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Nome da cidade contem números.",
    };
    return result;
  }

  const updatePublisher = await db.query(
    `update editores set nome = $1, localizacao = $2 where editora_id = $3`,
    [name, location, id]
  );

  if (updatePublisher.rowCount === 1) {
    result = {
      status: "Editora atualizada com sucesso!",
      statusCode: 200,
      message: name,
      message2: location,
    };
  } else {
    result = {
      statusCode: 404,
      message: "Editora não encontrada.",
    };
  }

  return result;
}

export async function deletePublisher(id: string) {
  const publisherName = await db.query(
    `SELECT e.nome as "Nome", e.localizacao from editores e where e.editora_id = $1`,
    [id]
  );
  const deletedPublisher = await db.query(
    `DELETE FROM editores where editora_id = $1`,
    [id]
  );
  let resultDeletedPublisher: any;

  if (deletedPublisher.rowCount === 1) {
    resultDeletedPublisher = {
      status: "Editora deletado com sucesso!",
      statusCode: 200,
      message: publisherName.rows,
    };
  } else {
    resultDeletedPublisher = {
      statusCode: 404,
      message: "Editora não encontrada.",
    };
  }

  return resultDeletedPublisher;
}
