import * as SQLite from "expo-sqlite";

export async function conexao(){
try{
    const db = SQLite.openDatabaseSync("PAM2");
    console.log("Conexão com o banco de dados estabelecida:", db);
    return db;
}catch(error){}
}
export async function createTable() {
    try{
    `PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS USUARIO (
      id INTEGER PRIMARY KEY AUTO_INCREMENT, 
      email VARCHAR(100), 
      nome VARCHAR(100)
      );`

      console.log('taberla fazida');
    }catch(error){
            console.log(error);
    }
  }



