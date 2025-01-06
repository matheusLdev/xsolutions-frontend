import type { Metadata } from 'next';
import { ReactQueryProvider } from '../providers/ReactQueryProvider';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'X-Solutions',
  description: 'Sistema de gerenciamento de produtos desenvolvido com Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="favicon.ico" type='image/x-icon' />
      </head>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
