import React, { useState } from 'react'; // Importar useState para gerenciar o estado do TextInput
import { View, Button, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

const banco = () => {
  const [nomeParaDeletar, setNomeParaDeletar] = useState(''); // Definir o estado para o nome a ser deletado

  async function criaBanco() {
    const db = await SQLite.openDatabaseAsync('PAM2');
    if (db) {
      console.log('Banco criado');
    } else {
      console.log('Erro ao criar o banco');
    }
  }

  // Criar tabela
  async function criarTabela() {
    const db = await SQLite.openDatabaseAsync('PAM2');
    if (db) {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS TB_usuarios (id INTEGER PRIMARY KEY NOT NULL, Nome TEXT NOT NULL);
      `);
      console.log('Tabela criada');
    } else {
      console.log('Erro ao criar a tabela');
    }
  }

  // Inserir dados na tabela
  async function inserir() {
    const db = await SQLite.openDatabaseAsync('PAM2');
    if (db) {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        INSERT INTO TB_usuarios (Nome) VALUES ('Cláudio'),('Renata'),('Gabriela');
      `);
      console.log('Inserido');
    } else {
      console.log('Erro ao inserir');
    }
  }

  // Exibir dados
  async function exibir() {
    const db = await SQLite.openDatabaseAsync('PAM2');
    if (db) {
      const allRows = await db.getAllAsync('SELECT * FROM TB_usuarios');
      for (const row of allRows) {
        console.log(row.id, row.Nome);
      }
    } else {
      console.log('Erro ao exibir');
    }
  }

  // Função para deletar um usuário com base no nome
  async function deletar() {
    const db = await SQLite.openDatabaseAsync('PAM2');
    if (db) {
      await db.runAsync(
        'DELETE FROM TB_usuarios WHERE Nome = ?',
        [nomeParaDeletar] // Passando o nome a ser deletado dinamicamente
      );
      console.log(`Usuário ${nomeParaDeletar} deletado com sucesso`);
    } else {
      console.log('Erro ao acessar o banco');
    }
  }

  return (
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

      <View style={{ marginBottom: 10 }}>
        <Button
          title="Inserir"
          onPress={() => inserir()}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button
          title="Exibir"
          onPress={() => exibir()}
        />
      </View>

      {/* Novo campo de entrada para o nome a ser deletado */}
      <View style={{ marginBottom: 10 }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 8
          }}
          placeholder="Digite o nome para deletar"
          value={nomeParaDeletar}
          onChangeText={setNomeParaDeletar} // Atualizando o valor do nome para deletar
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button
          title="Deletar"
          onPress={() => deletar()}
        />
      </View>
    </View>
  );
};

export default banco;
