import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, ScrollView, Alert } from "react-native";
import * as SQLite from "expo-sqlite";

// Abrir o banco só uma vez
const db = SQLite.openDatabaseSync("PAM2");

const Banco = () => {
  const [nome, setNome] = useState("");
  const [nomeAntigo, setNomeAntigo] = useState("");
  const [nomeNovo, setNomeNovo] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // Criar tabela ao iniciar
  useEffect(() => {
    criarTabela();
  }, []);

  async function criarTabela() {
    try {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS TB_usuarios (
          id INTEGER PRIMARY KEY NOT NULL,
          Nome TEXT NOT NULL
        );
      `);
      console.log("Tabela criada");
    } catch (error) {
      console.error("Erro ao criar tabela:", error);
    }
  }

  async function inserir() {
    if (!nome.trim()) {
      Alert.alert("Erro", "Digite um nome válido para inserir.");
      return;
    }

    try {
      await db.runAsync("INSERT INTO TB_usuarios (Nome) VALUES (?)", [nome]);
      console.log("Usuário inserido");
      setNome("");
      exibir();
    } catch (error) {
      console.error("Erro ao inserir:", error);
    }
  }

  async function exibir() {
    try {
      const results = await db.getAllAsync("SELECT * FROM TB_usuarios");
      setUsuarios(results);
    } catch (error) {
      console.error("Erro ao exibir:", error);
    }
  }

  async function deletar() {
    if (!nome.trim()) {
      Alert.alert("Erro", "Digite um nome válido para deletar.");
      return;
    }

    try {
      await db.runAsync("DELETE FROM TB_usuarios WHERE Nome = ?", [nome]);
      console.log(`Usuário ${nome} deletado`);
      setNome("");
      exibir();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  async function atualizar() {
    if (!nomeAntigo.trim() || !nomeNovo.trim()) {
      Alert.alert("Erro", "Preencha os dois nomes para atualizar.");
      return;
    }

    try {
      await db.runAsync("UPDATE TB_usuarios SET Nome = ? WHERE Nome = ?", [
        nomeNovo,
        nomeAntigo,
      ]);
      console.log(`Usuário ${nomeAntigo} atualizado para ${nomeNovo}`);
      setNomeAntigo("");
      setNomeNovo("");
      exibir();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>CRUD de Usuários</Text>

      <TextInput
        style={inputStyle}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Inserir" onPress={inserir} />

      <View style={{ height: 10 }} />

      <Button title="Exibir Todos" onPress={exibir} />

      <View style={{ marginVertical: 20 }}>
        {usuarios.map((user) => (
          <Text key={user.id}>
            ID: {user.id} - Nome: {user.Nome}
          </Text>
        ))}
      </View>

      <Button title="Deletar pelo nome" onPress={deletar} />

      <View style={{ height: 30 }} />

      <Text style={{ fontWeight: "bold" }}>Atualizar Nome</Text>

      <TextInput
        style={inputStyle}
        placeholder="Nome antigo"
        value={nomeAntigo}
        onChangeText={setNomeAntigo}
      />
      <TextInput
        style={inputStyle}
        placeholder="Novo nome"
        value={nomeNovo}
        onChangeText={setNomeNovo}
      />
      <Button title="Atualizar" onPress={atualizar} />
    </ScrollView>
  );
};

const inputStyle = {
  height: 40,
  borderColor: "gray",
  borderWidth: 1,
  marginBottom: 10,
  paddingLeft: 8,
};

export default Banco;
