import pg from "pg";
import "dotenv/config";

const db = new pg.Pool({
  user: `${process.env.PG_USERNAME}`,
  password: `${process.env.PG_PASSWORD}`,
  host: "localhost",
  database: "biblioteca",
  port: 5432,
});

export default db;
