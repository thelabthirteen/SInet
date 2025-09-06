import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NotesHub from './components/NotesHub';
import StudentForum from './components/StudentForum';
import Calendar from './components/Calendar';
import Chatbot from './components/Chatbot';
import CareerGuidance from './components/CareerGuidance';
import AlumniDirectory from './components/AlumniDirectory';
import InternationalSupport from './components/InternationalSupport';
import Login from './components/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
      case 'notes':
        return <NotesHub user={user} />;
      case 'forum':
        return <StudentForum user={user} />;
      case 'calendar':
        return <Calendar user={user} />;
      case 'chatbot':
        return <Chatbot user={user} />;
      case 'careers':
        return <CareerGuidance user={user} />;
      case 'alumni':
        return <AlumniDirectory user={user} />;
      case 'international':
        return <InternationalSupport user={user} />;
      default:
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;