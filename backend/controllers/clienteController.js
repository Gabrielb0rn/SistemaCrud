const pool = require('../database/db');
const { validarCliente } = require('../validators/clienteValidator');

exports.getAll = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM client');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

exports.getById = async (req, res) => {
  const { cpf } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM client WHERE cpf = $1', [cpf]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

exports.create = async (req, res) => {
  const clientes = Array.isArray(req.body) ? req.body : [req.body];
  const inseridos = [];

  try {
    for (const cliente of clientes) {
      const erro = validarCliente(cliente);
      if (erro) return res.status(400).json({ erro });

      const { rows: existing } = await pool.query(
        'SELECT * FROM client WHERE cpf = $1',
        [cliente.cpf]
      );
      if (existing.length > 0)
        return res.status(400).json({ erro: `CPF ${cliente.cpf} já cadastrado` });

      const sql = 'INSERT INTO client (cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const { rows } = await pool.query(sql, [
        cliente.cpf,
        cliente.nome,
        cliente.email,
        cliente.idade,
        cliente.profissao
      ]);
      inseridos.push(rows[0]);
    }

    res.status(201).json({ mensagem: 'Clientes cadastrados com sucesso', clientes: inseridos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao inserir cliente(s)' });
  }
};

exports.update = async (req, res) => {
  const { cpf } = req.params;
  const cliente = req.body;
  const erro = validarCliente(cliente);
  if (erro) return res.status(400).json({ erro });

  try {
    const { rows: existing } = await pool.query('SELECT * FROM client WHERE cpf = $1 AND cpf != $2', [cliente.cpf, cpf]);
    if (existing.length > 0) return res.status(400).json({ erro: 'CPF já cadastrado' });

    const sql = 'UPDATE client SET nome = $1, email = $2, idade = $3, profissao = $4 WHERE cpf = $5 RETURNING *';
    const { rows } = await pool.query(sql, [cliente.nome, cliente.email, cliente.idade, cliente.profissao, cpf]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente atualizado com sucesso', cliente: rows[0] });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente' });
  }
};

exports.remove = async (req, res) => {
  const { cpf } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM client WHERE cpf = $1', [cpf]);
    if (rowCount === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir cliente' });
  }
};