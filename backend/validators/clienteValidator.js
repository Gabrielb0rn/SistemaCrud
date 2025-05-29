function validarCliente(cliente) {
  const { nome, email, cpf, telefone } = cliente;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const regexTelefone = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

  if (!nome || !email || !cpf || !telefone) return 'Todos os campos são obrigatórios.';
  if (nome.length > 100) return 'Nome deve ter no máximo 100 caracteres.';
  if (email.length > 100) return 'Email deve ter no máximo 100 caracteres.';
  if (cpf.length > 14) return 'CPF deve ter no máximo 14 caracteres.';
  if (telefone.length > 20) return 'Telefone deve ter no máximo 20 caracteres.';
  if (!regexEmail.test(email)) return 'Email inválido.';
  if (!regexCpf.test(cpf)) return 'CPF inválido. Formato esperado: 000.000.000-00';
  if (!regexTelefone.test(telefone)) return 'Telefone inválido. Use (DD) 99999-9999';

  return null;
}

module.exports = { validarCliente };