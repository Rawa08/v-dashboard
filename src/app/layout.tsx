import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <AuthProvider>{children}</AuthProvider>
    </body>
  </html>
);

export default RootLayout;
