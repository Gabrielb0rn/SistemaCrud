import './globals.css'

export const metadata = {
  title: 'Clientes - CRUD',
  description: 'Sistema CRUD para gerenciamento de clientes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}