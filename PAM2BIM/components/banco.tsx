import react from 'react';
import {View, Button} from 'react-native';
import * as SQLite from 'expo-sqlite';


//componente

const banco=()=>{


    async function criaBanco() {
        const db = await SQLite.openDatabaseAsync('PAM2');
        if(db){
            console.log('Banco criado');
        } else{
            console.log("Erro ao criar o banco")
        }

    }

//Criar tabela
async function criarTabela() {
    const db = await SQLite.openDatabaseAsync('PAM2');
        if(db){
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);`);
            console.log('Tabela criada');
        } else{
            console.log("Erro ao criar a tabela")
        }
    
    
}

    return(
        <View>
            <View style={{ marginBottom: 10 }}>
                <Button
                    title="Criar banco"
                    onPress={() => criaBanco()}
                />
            </View>

            <View style={{ marginBottom: 10 }}>
                <Button
                    title="Criar tabela"
                    onPress={() => criarTabela()}
                />
            </View>
        </View>
    )
};

export default banco;