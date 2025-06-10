CREATE DATABASE sistema_crud;

\c sistema_crud;

CREATE TABLE client (
  cpf VARCHAR(11) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  idade INTEGER,
  profissao VARCHAR(50)
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  cpf VARCHAR(14) UNIQUE,
  telefone VARCHAR(20)
);