type Usuario = {
  id: number;
  Nome: string;
};

import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import InserirUsuario from "./components/inserirUsuario";
import ExibirUsuarios from "./components/exibirUsuario";
import DeletarUsuario from "./components/deletarUsuario";
import AtualizarUsuario from "./components/editarUsuario";
import { db, criarTabela } from "./database/db";

export default function App() {
 const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    criarTabela().then(() => carregarUsuarios());
  }, []);

  const carregarUsuarios = async () => {
  try {
    const results = await db.getAllAsync<Usuario>("SELECT * FROM TB_usuarios");
    setUsuarios(results);
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
};

  return (
    <ScrollView contentContainerStyle={{ padding: 10, margin: 10 }}>
      <Text style={{ fontSize: 20, margin: 20 }}>CRUD de Usuários</Text>

      <InserirUsuario onRefresh={carregarUsuarios} />
      
      <DeletarUsuario onRefresh={carregarUsuarios} />
      <AtualizarUsuario onRefresh={carregarUsuarios} />
      <ExibirUsuarios usuarios={usuarios} />
    </ScrollView>
  );
}
