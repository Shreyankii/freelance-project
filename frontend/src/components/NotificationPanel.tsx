import { Bell, X, Mail, Star, Clock } from 'lucide-react';
import { Notification } from '../App';

interface NotificationPanelProps {
  notifications: Notification[];
  onDismiss: (notificationId: string) => void;
}

export function NotificationPanel({ notifications, onDismiss }: NotificationPanelProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handleContactFreelancer = (email: string, freelancerName: string, projectTitle: string) => {
    const subject = encodeURIComponent(`Regarding: ${projectTitle}`);
    const body = encodeURIComponent(`Hi ${freelancerName},\n\nI noticed your profile matches my project "${projectTitle}". I'd like to discuss the opportunity further.\n\nBest regards`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 sticky top-8">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Matched Freelancers</h3>
          </div>
          {notifications.length > 0 && (
            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">
              No matches yet. Post a project to find freelancers!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map(notification => (
              <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex gap-3">
                  <img
                    src={notification.freelancer.avatar}
                    alt={notification.freelancer.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {notification.freelancer.name}
                      </h4>
                      <button
                        onClick={() => onDismiss(notification.id)}
                        className="p-1 hover:bg-gray-200 rounded flex-shrink-0"
                      >
                        <X className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {notification.freelancer.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Star className="w-3 h-3" />
                      <span>{notification.freelancer.experience} years exp</span>
                      <span>•</span>
                      <span>${notification.freelancer.hourlyRate}/hr</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-xs mb-2">
                      <p className="text-blue-800 font-medium mb-1">
                        Matched for: {notification.projectTitle}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {notification.freelancer.technologies.slice(0, 3).map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {notification.freelancer.technologies.length > 3 && (
                          <span className="px-2 py-0.5 text-blue-700 text-xs">
                            +{notification.freelancer.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleContactFreelancer(
                          notification.freelancer.email,
                          notification.freelancer.name,
                          notification.projectTitle
                        )}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        Contact
                      </button>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {formatTime(notification.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
