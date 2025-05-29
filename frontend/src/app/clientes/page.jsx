'use client';

import { useState, useEffect } from 'react';
import ClienteForm from '../../components/ClienteForm';
import ClienteList from '../../components/ClienteList';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/clientes';

export default function ClientesPage() {
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [clientes, setClientes] = useState([]);
  const [editCliente, setEditCliente] = useState(null);

  const mostrarMensagem = (texto, tipo) => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
  };

  const carregarClientes = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Erro ao carregar clientes');
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      mostrarMensagem(err.message, 'erro');
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Cadastro de Clientes</h1>
      {mensagem.texto && (
        <div
          className={`p-4 mb-4 rounded-md ${
            mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {mensagem.texto}
        </div>
      )}
      <ClienteForm
        editCliente={editCliente}
        setEditCliente={setEditCliente}
        carregarClientes={carregarClientes}
        mostrarMensagem={mostrarMensagem}
      />
      <ClienteList
        clientes={clientes}
        setEditCliente={setEditCliente}
        carregarClientes={carregarClientes}
        mostrarMensagem={mostrarMensagem}
      />
    </div>
  );
}