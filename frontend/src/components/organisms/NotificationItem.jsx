export const NotificationItem = ({ notification }) => (
    <div className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
      <p className="text-gray-400 mb-1">{notification.message}</p>
      <p className="text-xs text-gray-500">{notification.time}</p>
    </div>
  );
  