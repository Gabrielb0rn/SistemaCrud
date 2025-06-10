import './globals.css'

export const metadata = {
  title: 'Clientes - CRUD',
  description: 'Sistema CRUD para gerenciamento de clientes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 min-h-screen text-gray-900">{children}</body>
    </html>
  );
}