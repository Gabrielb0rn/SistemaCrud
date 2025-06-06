const pool = require('../database/db');
const { validarCliente } = require('../validators/clienteValidator');

exports.getAll = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
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
        'SELECT * FROM clientes WHERE cpf = $1',
        [cliente.cpf]
      );
      if (existing.length > 0)
        return res.status(400).json({ erro: `CPF ${cliente.cpf} já cadastrado` });

      const sql = 'INSERT INTO clientes (nome, email, cpf, telefone) VALUES ($1, $2, $3, $4) RETURNING *';
      const { rows } = await pool.query(sql, [
        cliente.nome,
        cliente.email,
        cliente.cpf,
        cliente.telefone,
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
  const { id } = req.params;
  const cliente = req.body;
  const erro = validarCliente(cliente);
  if (erro) return res.status(400).json({ erro });

  try {
    const { rows: existing } = await pool.query('SELECT * FROM clientes WHERE cpf = $1 AND id != $2', [cliente.cpf, id]);
    if (existing.length > 0) return res.status(400).json({ erro: 'CPF já cadastrado' });

    const sql = 'UPDATE clientes SET nome = $1, email = $2, cpf = $3, telefone = $4 WHERE id = $5 RETURNING *';
    const { rows } = await pool.query(sql, [cliente.nome, cliente.email, cliente.cpf, cliente.telefone, id]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente atualizado com sucesso', cliente: rows[0] });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente' });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir cliente' });
  }
};