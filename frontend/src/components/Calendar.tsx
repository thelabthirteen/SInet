import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Bell,
  Clock,
  BookOpen,
  Users,
  AlertTriangle
} from 'lucide-react';

interface CalendarProps {
  user: any;
}

const Calendar: React.FC<CalendarProps> = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');

  const events = [
    {
      id: 1,
      title: 'Data Structures Assignment Due',
      course: 'SCSJ1023',
      date: '2024-02-15',
      time: '23:59',
      type: 'assignment',
      priority: 'high',
      description: 'Binary tree implementation project submission'
    },
    {
      id: 2,
      title: 'Calculus Midterm Exam',
      course: 'SCSM1013',
      date: '2024-02-18',
      time: '14:00',
      type: 'exam',
      priority: 'high',
      description: 'Covers chapters 1-5, differentiation and integration'
    },
    {
      id: 3,
      title: 'Software Engineering Quiz',
      course: 'SCSE2623',
      date: '2024-02-20',
      time: '10:00',
      type: 'quiz',
      priority: 'medium',
      description: 'Online quiz on SDLC methodologies'
    },
    {
      id: 4,
      title: 'Group Project Meeting',
      course: 'SCSE2623',
      date: '2024-02-22',
      time: '15:00',
      type: 'meeting',
      priority: 'medium',
      description: 'Weekly sync with team members'
    },
    {
      id: 5,
      title: 'Research Proposal Submission',
      course: 'SCRM7001',
      date: '2024-02-25',
      time: '17:00',
      type: 'assignment',
      priority: 'high',
      description: 'PhD research proposal final submission'
    }
  ];

  const upcomingDeadlines = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getEventColor = (type: string, priority: string) => {
    const colors = {
      assignment: priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-orange-100 text-orange-800 border-orange-200',
      exam: 'bg-purple-100 text-purple-800 border-purple-200',
      quiz: 'bg-blue-100 text-blue-800 border-blue-200',
      meeting: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEventIcon = (type: string) => {
    const icons = {
      assignment: BookOpen,
      exam: AlertTriangle,
      quiz: Clock,
      meeting: Users
    };
    return icons[type] || BookOpen;
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === dateString);
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`h-10 cursor-pointer rounded-lg flex items-center justify-center text-sm relative transition-all duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white'
              : isToday
              ? 'bg-blue-100 text-blue-600 font-semibold'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
          {dayEvents.length > 0 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-600'}`}></div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = events.filter(
    event => event.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Calendar</h1>
          <p className="text-gray-600">Track your deadlines, exams, and important events</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>

            {/* Selected Date Events */}
            {selectedDateEvents.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Events for {formatDate(selectedDate)}
                </h3>
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <div key={event.id} className={`p-4 rounded-xl border ${getEventColor(event.type, event.priority)}`}>
                        <div className="flex items-start space-x-3">
                          <Icon className="w-5 h-5 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm opacity-75 mt-1">{event.course} • {event.time}</p>
                            <p className="text-sm mt-2">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Upcoming Deadlines</span>
            </h3>
            <div className="space-y-3">
              {upcomingDeadlines.map((event) => {
                const Icon = getEventIcon(event.type);
                const daysUntil = Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                
                return (
                  <div key={event.id} className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                    <div className="flex items-start space-x-3">
                      <Icon className="w-4 h-4 mt-1 text-gray-600" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{event.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{event.course}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{event.time}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            daysUntil <= 1 ? 'bg-red-100 text-red-600' :
                            daysUntil <= 3 ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Assignments Due</span>
                <span className="font-semibold text-red-600">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Exams</span>
                <span className="font-semibold text-purple-600">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Meetings</span>
                <span className="font-semibold text-green-600">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;