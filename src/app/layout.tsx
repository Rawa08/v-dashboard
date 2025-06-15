import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <AuthProvider>{children}</AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </body>
  </html>
);

export default RootLayout;
