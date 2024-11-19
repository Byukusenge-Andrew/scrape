'use client'
import { Notification } from '@/types'; 
import './globals.css';
import Navbar from '@/components/Navbar';
import Notifications, { useNotifications } from '@/components/useNotifications';
import { useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className='min-h-screen min-w-full bg-gradient-to-b from-gray-900 to-gray-800'>{children}</main>
        <Notifications
          notifications={notifications}
          removeNotification={(id) =>
            setNotifications((prev) => prev.filter((n) => n.id !== id))
          }
        />
      </body>
    </html>
  );
}
