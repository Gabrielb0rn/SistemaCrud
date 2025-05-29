CREATE DATABASE sistema_crud;

\c sistema_crud;

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  cpf VARCHAR(14) UNIQUE,
  telefone VARCHAR(20)
);