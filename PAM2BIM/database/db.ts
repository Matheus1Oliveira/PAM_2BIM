import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("PAM2");

export async function criarTabela() {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS TB_usuarios (
        id INTEGER PRIMARY KEY NOT NULL,
        Nome TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  }
}
