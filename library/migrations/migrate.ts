import path from "path";
import { promises as fs } from "fs";
import db from "../src/database/connect";

const migrationFolder = path.join(__dirname, "migrations-sql");

async function runMigrations() {
  try {
    const files = await fs.readdir(migrationFolder);

    for (const file of files) {
      const migrationFilePath = path.join(migrationFolder, file);
      const migrationSql = await fs.readFile(migrationFilePath, "utf-8");

      await db.query(migrationSql);
      console.log(`Arquivo ${file} executado com sucesso!`);
    }
  } catch (error) {
    console.error("Erro ao executar arquivo: ", error);
  }
}

runMigrations();
