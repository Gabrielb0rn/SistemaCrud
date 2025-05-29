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