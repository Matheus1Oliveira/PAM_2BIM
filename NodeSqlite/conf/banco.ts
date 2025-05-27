import * as SQLite from "expo-sqlite";

export async function conexao(){
try{
    const db = SQLite.openDatabaseSync("PAM2");
    console.log("Conexão com o banco de dados estabelecida");
    return db;
}catch(error){}
}
export async function createTable(db: SQLite.SQLiteDatabase) {
    try{
      await db!.runAsync(
    `PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS USUARIO (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      email VARCHAR(100), 
      nome VARCHAR(100)
      );`);
      console.log("tabela feita");

      
    }catch(error){
            console.log(error);
    }
  }

  export async function insertTable(db: SQLite.SQLiteDatabase, email: string, nome: string) {

    try{
          await db!.runAsync("INSERT INTO USUARIO (Nome, email) VALUES (?, ?)", [nome, email]);
      
    }catch(error){
            console.log("erro");
    }
  }
export async function selectTable(db: SQLite.SQLiteDatabase) {
  
    try{
      const result = await db!.getAllAsync(
    ` SELECT * FROM USUARIO`);
    return result;
    }catch(error){
            console.log(error);
    }
  }
   export async function selectUm(db:SQLite.SQLiteDatabase, id:number) {
    try {
        
       const result = await db.getFirstAsync(' SELECT * FROM USUARIO WHERE ID_US = ?',id);
       console.log('Filtro de Usuario por ID ' + id );
       return result;

    } catch (error) {
         console.log('Erro ao buscar usuario ' + error);
    }

 }


  



