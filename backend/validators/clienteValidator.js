function validarCliente(cliente) {
  const { nome, email, cpf, idade, profissao } = cliente;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexCpf = /^\d{11}$/;

  if (!nome || !email || !cpf || idade === undefined || !profissao) return 'Todos os campos são obrigatórios.';
  if (nome.length > 100) return 'Nome deve ter no máximo 100 caracteres.';
  if (email.length > 100) return 'Email deve ter no máximo 100 caracteres.';
  if (cpf.length !== 11) return 'CPF deve ter exatamente 11 dígitos.';
  if (!regexEmail.test(email)) return 'Email inválido.';
  if (!regexCpf.test(cpf)) return 'CPF inválido. Deve conter apenas números.';
  if (typeof idade !== 'number' || idade < 0) return 'Idade deve ser um número positivo.';
  if (profissao.length > 50) return 'Profissão deve ter no máximo 50 caracteres.';

  return null;
}

module.exports = { validarCliente };