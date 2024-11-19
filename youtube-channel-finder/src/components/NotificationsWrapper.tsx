'use client';

import { useState } from 'react';
import Notifications from '@/components/useNotifications';
import { Notification } from '@/types';

export default function NotificationsWrapper() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <Notifications
      notifications={notifications}
      removeNotification={(id) =>
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }
    />
  );
}
