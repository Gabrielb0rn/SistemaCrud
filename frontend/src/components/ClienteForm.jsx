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
    telefone: "",
  });

  useEffect(() => {
    if (editCliente) setCliente(editCliente);
  }, [editCliente]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = cliente.id ? "PUT" : "POST";
    const url = process.env.NEXT_PUBLIC_API_URL + (cliente.id ? `/${cliente.id}` : "");
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
      if (!res.ok) throw new Error("Erro ao salvar cliente");
      carregarClientes();
      mostrarMensagem("Cliente salvo com sucesso", "sucesso");
      setCliente({ nome: "", email: "", cpf: "", telefone: "" });
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
      <input
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="nome"
        placeholder="Nome"
        value={cliente.nome}
        onChange={handleChange}
        required
      />
      <input
        className="border border-gray-300 p-2 rounded"
        type="email"
        name="email"
        placeholder="Email"
        value={cliente.email}
        onChange={handleChange}
        required
      />
      <input
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="cpf"
        placeholder="CPF"
        value={cliente.cpf}
        onChange={handleChange}
        required
      />
      <input
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="telefone"
        placeholder="Telefone"
        value={cliente.telefone}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="col-span-1 sm:col-span-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {cliente.id ? "Atualizar Cliente" : "Cadastrar Cliente"}
      </button>
    </form>
  );
}
