import React from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Calendar,
  Bot,
  TrendingUp,
  Users,
  Star,
  Clock,
  FileText,
  Award
} from 'lucide-react';

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const quickActions = [
    { id: 'notes', label: 'Browse Notes', icon: BookOpen, color: 'blue', description: 'Access course materials' },
    { id: 'forum', label: 'Student Forum', icon: MessageSquare, color: 'green', description: 'Share and discuss' },
    { id: 'calendar', label: 'View Calendar', icon: Calendar, color: 'purple', description: 'Check deadlines' },
    { id: 'chatbot', label: 'Ask Assistant', icon: Bot, color: 'orange', description: 'Get instant help' },
  ];

  const recentActivity = [
    { type: 'note', title: 'Data Structures - Week 5', time: '2 hours ago', rating: 4.8 },
    { type: 'forum', title: 'New discussion in Programming Forum', time: '4 hours ago', replies: 12 },
    { type: 'deadline', title: 'Assignment due in 2 days', time: '6 hours ago', course: 'Software Engineering' },
  ];

  const stats = [
    { label: 'Notes Downloaded', value: '23', icon: FileText, color: 'blue' },
    { label: 'Forum Posts', value: '8', icon: MessageSquare, color: 'green' },
    { label: 'Upcoming Deadlines', value: '5', icon: Clock, color: 'red' },
    { label: 'Recognition Points', value: '142', icon: Award, color: 'yellow' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-blue-100 mb-4">
            {user?.program} Student • Year {user?.year} • Student ID: {user?.studentId}
          </p>
          <div className="flex items-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Active since joining SINet</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Connected with 284 students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            red: 'bg-red-50 text-red-600 border-red-200',
            yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
          };

          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl border ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
                purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
              };

              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate(action.id)}
                  className={`p-6 rounded-xl text-white text-left transition-all duration-200 transform hover:scale-105 hover:shadow-lg bg-gradient-to-br ${colorClasses[action.color]}`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold mb-1">{action.label}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="flex-shrink-0">
                    {activity.type === 'note' && <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />}
                    {activity.type === 'forum' && <MessageSquare className="w-5 h-5 text-green-600 mt-0.5" />}
                    {activity.type === 'deadline' && <Clock className="w-5 h-5 text-red-600 mt-0.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    {activity.rating && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{activity.rating}</span>
                      </div>
                    )}
                    {activity.replies && (
                      <p className="text-xs text-green-600 mt-1">{activity.replies} replies</p>
                    )}
                    {activity.course && (
                      <p className="text-xs text-blue-600 mt-1">{activity.course}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Latest Announcements</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900">New SINet AI Assistant Features</h3>
              <p className="text-gray-600 text-sm mt-1">
                Our UTMKL Assistant now supports course-specific queries and can help with assignment guidelines.
              </p>
              <p className="text-xs text-gray-500 mt-2">Posted 2 days ago</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900">SINet Semester Recognition Awards</h3>
              <p className="text-gray-600 text-sm mt-1">
                Congratulations to our top 3 SINet contributors this semester! Check the Forum for details.
              </p>
              <p className="text-xs text-gray-500 mt-2">Posted 1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;