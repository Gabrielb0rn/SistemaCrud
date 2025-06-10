'use client';

import { FaEdit, FaTrash } from 'react-icons/fa';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/clientes';

export default function ClienteList({ clientes, setEditCliente, carregarClientes, mostrarMensagem }) {
  const deletarCliente = async (cpf) => {
    if (window.confirm('Deseja excluir este cliente?')) {
      try {
        const res = await fetch(`${API_URL}/${cpf}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.erro || 'Erro ao excluir');
        carregarClientes();
        mostrarMensagem('Cliente excluído com sucesso', 'sucesso');
      } catch (err) {
        mostrarMensagem('Erro: ' + err.message, 'erro');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">CPF</th>
            <th className="p-3 text-left">Idade</th>
            <th className="p-3 text-left">Profissão</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.cpf} className="border-t">
              <td className="p-3">{cliente.nome}</td>
              <td className="p-3">{cliente.email}</td>
              <td className="p-3">{cliente.cpf}</td>
              <td className="p-3">{cliente.idade}</td>
              <td className="p-3">{cliente.profissao}</td>
              <td className="p-3">
                <button
                  onClick={() => setEditCliente(cliente)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deletarCliente(cliente.cpf)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}