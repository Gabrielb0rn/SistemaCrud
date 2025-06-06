Projeto CRUD

Sistema CRUD para gerenciamento de clientes, com backend em Node.js, Express, PostgreSQL e frontend em Next.js com Tailwind CSS. Suporta operações CRUD com validações, tratamento de erros e notificações visuais. Preparado para hospedagem na Vercel (frontend) e outras plataformas (backend).

Estrutura do Projeto

Projeto-crud/
├── backend/                # API RESTful
├── frontend/               # Interface Next.js
├── database.sql           # Script SQL
├── INSTRUCOES_CONFIGURACAO.txt
├── INSTRUCOES_ALTERACOES.txt
└── README.md

Pré-requisitos





Node.js: https://nodejs.org/



PostgreSQL: https://www.postgresql.org/download/



pgAdmin: https://www.pgadmin.org/



Vercel CLI: npm install -g vercel

Configuração Local





Banco de Dados:





Crie o banco "sistema_crud" no pgAdmin.



Execute database.sql para criar a tabela clientes.



Backend:





cd backend



npm install



Configure .env com credenciais PostgreSQL.



npm start



Frontend:





cd frontend



npm install



Configure .env.local com a URL da API.



npm run dev



Acesse http://localhost:3000/clientes

Hospedagem na Vercel (Frontend)





Crie um repositório Git para a pasta frontend.



Deploy: vercel



Configure NEXT_PUBLIC_API_URL na Vercel com a URL do backend hospedado.

Hospedagem do Backend





Use Render, Railway, ou outra plataforma.



Configure variáveis de ambiente (.env).



Use um banco PostgreSQL hospedado (ex.: Supabase).

Testes





Cadastre, edite e exclua clientes.



Teste CPFs duplicados e campos inválidos.



Verifique mensagens de erro/sucesso.

Personalizações

Veja INSTRUCOES_ALTERACOES.txt.

Compactação

Compacte a pasta Projeto-crud em Projeto-crud.zip.

exemplo para post:

[
    {
        "id": 1,
        "nome": "Gab",
        "email": "gab@gmail.com",
        "cpf": "123.123.123-12",
        "telefone": "00123456799"
    },
    {
        "id": 2,
        "nome": "Gab1",
        "email": "gab1@gmail.com",
        "cpf": "223.123.123-12",
        "telefone":"10123456799"
    },
    {
        "id": 3,
        "nome": "Gab2",
        "email": "gab2@gmail.com",
        "cpf": "323.123.123-12",
        "telefone": "20123456799"
    },
    {
        "id": 4,
        "nome": "Gab3",
        "email": "gab3@gmail.com",
        "cpf": "423.123.123-12",
        "telefone": "30123456799"
    },
    {
        "id": 5,
        "nome": "Gab4",
        "email": "gab4@gmail.com",
        "cpf": "523.123.123-12",
        "telefone": "40123456799"
    }

]
