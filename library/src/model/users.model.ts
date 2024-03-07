import db from "../database/connect";

export async function createUser({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  let result: any;

  if (!name || name.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Nome do usuário não fornecido ou inválido.",
    };
    return result;
  }
  if (!password || password.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Senha não fornecido ou inválido.",
    };
    return result;
  }

  const user = await db.query(
    `insert into usuarios (nome, senha) values ($1, $2)`,
    [name, password]
  );

  if (user.rowCount === 1) {
    result = {
      statusCode: 201,
      status: "Usuario criado com sucesso!",
      message: name,
    };
  }

  return result;
}

export async function findAllUsers() {
  const author = await db.query("SELECT a.nome FROM usuarios a");
  return author.rows;
}

export async function findUserById(id: string) {
  const findAuthorById = await db.query(
    `SELECT u.user_id as "id", u.nome as "nome" FROM usuarios u WHERE u.user_id  = $1`,
    [id]
  );
  return findAuthorById.rows;
}

export async function authUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  let result: any;

  if (!email || email.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Nome do usuário não fornecido ou inválido.",
    };
    return result;
  }
  if (!password || password.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Senha não fornecido ou inválido.",
    };
    return result;
  }

  const verifedUser = await db.query(
    `select u.user_id , u.nome from usuarios u where u.nome = $1 and u.senha = $2`,
    [email, password]
  );

  if (verifedUser.rowCount === 1) {
    result = {
      statusCode: 200,
      status: "Login Realizado com sucesso",
    };
  } else {
    result = {
      statusCode: 404,
      message: "Erro: Usuário não encontrado.",
    };
  }
  return result;
}

export async function updateUserPassword(id: string, password: string) {
  let result: any;

  if (!password || password.trim() === "") {
    result = {
      statusCode: 400,
      status: "Bad Request!",
      message: "Erro: Senha não fornecido ou inválido.",
    };
    return result;
  }

  const updatedUser = await db.query(
    `UPDATE usuarios SET senha = $1 WHERE user_id = $2`,
    [password, id]
  );

  if (updatedUser.rowCount === 1) {
    result = {
      statusCode: 200,
      status: "Senha atualizada com sucesso!",
    };
  } else {
    result = {
      statusCode: 404,
      message: "Erro: Usuário não encontrado.",
    };
  }
  return result;
}

export async function deleteUser(id: string) {
  const userName = await db.query(
    `SELECT u.nome as "nome" from usuarios u where u.user_id = $1`,
    [id]
  );
  const deletedUser = await db.query(
    `DELETE FROM usuarios where user_id = $1`,
    [id]
  );
  let resultDeletedUser: any;

  if (deletedUser.rowCount === 1) {
    resultDeletedUser = {
      status: "Usuario deletado com sucesso!",
      statusCode: 200,
      message: userName.rows,
    };
  } else {
    resultDeletedUser = {
      statusCode: 404,
      message: "Erro: Usuario não encontrado.",
    };
  }

  return resultDeletedUser;
}
