"use client";
import { useEffect, useState } from "react";

export default function ClienteForm({
  editCliente,
  setEditCliente,
  carregarClientes,
  mostrarMensagem,
}) {
  const [cliente, setCliente] = useState({
    nome: "",
    email: "",
    cpf: "",
    idade: "",
    profissao: ""
  });

  useEffect(() => {
    if (editCliente) setCliente(editCliente);
  }, [editCliente]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = cliente.cpf && editCliente ? "PUT" : "POST";
    const url = process.env.NEXT_PUBLIC_API_URL + (cliente.cpf && editCliente ? `/${cliente.cpf}` : "");
    try {
      const payload = { ...cliente, idade: Number(cliente.idade) };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erro ao salvar cliente");
      carregarClientes();
      mostrarMensagem("Cliente salvo com sucesso", "sucesso");
      setCliente({ nome: "", email: "", cpf: "", idade: "", profissao: "" });
      setEditCliente(null);
    } catch (err) {
      mostrarMensagem(err.message, "erro");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div className="flex flex-col">
        <label htmlFor="nome" className="mb-1 font-semibold">Nome</label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          name="nome"
          id="nome"
          placeholder="Ex: Maria da Silva"
          value={cliente.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-semibold">Email</label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="email"
          name="email"
          id="email"
          placeholder="Ex: maria@email.com"
          value={cliente.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="cpf" className="mb-1 font-semibold">CPF</label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          name="cpf"
          id="cpf"
          placeholder="Ex: 000.000.000-00"
          value={cliente.cpf}
          onChange={handleChange}
          required
          disabled={!!editCliente}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="idade" className="mb-1 font-semibold">Idade</label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="number"
          name="idade"
          id="idade"
          placeholder="Ex: 30"
          value={cliente.idade}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col sm:col-span-2">
        <label htmlFor="profissao" className="mb-1 font-semibold">Profissão</label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          name="profissao"
          id="profissao"
          placeholder="Ex: Engenheira de Software"
          value={cliente.profissao}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="sm:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        {editCliente ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
}
