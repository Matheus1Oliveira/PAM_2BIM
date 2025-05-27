import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { conexao, createTable, insertTable, selectTable, selectUm } from './conf/banco';
import { useEffect } from 'react';
import * as SQLite from "expo-sqlite";
import * as React from 'react';
import { Button } from 'react-native-paper';

export default function App() {

  // ---- HOOK
  useEffect(()=>{
     async function Main() {
        let db =  await conexao();
        await createTable(db!);
        // inserirUsuario(db,'Giovanna','@Giovanna');

          const registro = await selectTable(db!) as Array<{id: number, nome: string, email: string}>;

          for( const linhas of registro ){
             
              console.log(linhas.id, linhas.nome, linhas.email,)
          }

         const nome  = await selectUm(db!,1) as {id: number, nome: string, email: string};       

             
              console.log(nome.id, nome.nome,nome.email,)
        

      
     }
      
     Main();
  },[])

  

  return (
    <View style={styles.container}>
      <Button icon="camera" mode="contained" onPress={() => createTable()}>
        cria tabela
      </Button>
      <Button icon="camera" mode="contained" onPress={() => insertTable("test","teste")}>
        insert
      </Button>
      <Button icon="camera" mode="contained" onPress={() => selectTable()}>
        view
      </Button>
      <Button icon="camera" mode="contained" onPress={() => selectUm(1)}>
        view where
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
