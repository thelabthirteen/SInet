import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Star, 
  Eye, 
  Calendar,
  User,
  FileText,
  BookOpen,
  GraduationCap,
  ChevronDown
} from 'lucide-react';

interface NotesHubProps {
  user: any;
}

const NotesHub: React.FC<NotesHubProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for notes
  const notes = [
    {
      id: 1,
      title: 'Data Structures and Algorithms - Complete Guide',
      course: 'SCSJ1023',
      program: 'Bachelor\'s',
      semester: '2024/25 Semester 1',
      author: 'SINet Official',
      authorType: 'official',
      rating: 4.8,
      reviews: 127,
      downloads: 1543,
      uploadDate: '2024-01-15',
      description: 'Comprehensive notes covering all data structures with examples and implementations.',
      tags: ['Data Structures', 'Algorithms', 'Programming'],
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      title: 'Calculus I - Differentiation and Integration',
      course: 'SCSM1013',
      program: 'Foundation',
      semester: '2024/25 Semester 1',
      author: 'Ahmad Rahman',
      authorType: 'student',
      rating: 4.6,
      reviews: 89,
      downloads: 956,
      uploadDate: '2024-02-01',
      description: 'Step-by-step solutions and explanations for calculus problems.',
      tags: ['Mathematics', 'Calculus', 'Integration'],
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      title: 'Research Methodology - PhD Guidelines',
      course: 'SCRM7001',
      program: 'PhD',
      semester: '2024/25 Semester 1',
      author: 'Dr. Sarah Ahmad',
      authorType: 'official',
      rating: 4.9,
      reviews: 45,
      downloads: 234,
      uploadDate: '2024-01-20',
      description: 'Advanced research methodology for PhD candidates with practical examples.',
      tags: ['Research', 'Methodology', 'PhD'],
      fileSize: '3.1 MB'
    },
    {
      id: 4,
      title: 'Software Engineering Principles',
      course: 'SCSE2623',
      program: 'Bachelor\'s',
      semester: '2024/25 Semester 1',
      author: 'Lisa Chen',
      authorType: 'student',
      rating: 4.5,
      reviews: 72,
      downloads: 687,
      uploadDate: '2024-02-10',
      description: 'Detailed notes on SDLC, design patterns, and best practices.',
      tags: ['Software Engineering', 'Design Patterns', 'SDLC'],
      fileSize: '2.0 MB'
    },
    {
      id: 5,
      title: 'Advanced Machine Learning Concepts',
      course: 'SCSE7623',
      program: 'Masters',
      semester: '2024/25 Semester 1',
      author: 'SINet Official',
      authorType: 'official',
      rating: 4.7,
      reviews: 56,
      downloads: 423,
      uploadDate: '2024-01-25',
      description: 'Deep learning, neural networks, and advanced ML algorithms.',
      tags: ['Machine Learning', 'AI', 'Deep Learning'],
      fileSize: '4.2 MB'
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProgram = selectedProgram === 'all' || note.program === selectedProgram;
    const matchesSemester = selectedSemester === 'all' || note.semester === selectedSemester;
    const matchesCourse = selectedCourse === 'all' || note.course === selectedCourse;
    
    return matchesSearch && matchesProgram && matchesSemester && matchesCourse;
  });

  const sortedNotes = filteredNotes.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'date':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      default:
        return (b.rating * b.downloads) - (a.rating * a.downloads);
    }
  });

  const getProgramIcon = (program: string) => {
    switch (program) {
      case 'Foundation': return GraduationCap;
      case 'Bachelor\'s': return BookOpen;
      case 'Masters': return FileText;
      case 'PhD': return User;
      default: return BookOpen;
    }
  };

  const getProgramColor = (program: string) => {
    switch (program) {
      case 'Foundation': return 'text-green-600 bg-green-50 border-green-200';
      case 'Bachelor\'s': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Masters': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'PhD': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Notes & Resources Hub</h1>
        <p className="text-gray-600">
          Access comprehensive study materials for all UTMKL programs. Rate and review to help fellow students.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes, courses, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden px-4 py-3 border border-gray-200 rounded-xl flex items-center space-x-2 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Quick Filters - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Programs</option>
              <option value="Foundation">Foundation</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="downloads">Most Downloaded</option>
              <option value="date">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Expandable Filters - Mobile */}
        {(showFilters || true) && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Programs</option>
              <option value="Foundation">Foundation</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="downloads">Most Downloaded</option>
              <option value="date">Most Recent</option>
            </select>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {sortedNotes.length} notes {searchTerm && `for "${searchTerm}"`}
        </p>
        <div className="text-sm text-gray-500">
          {sortedNotes.length} of {notes.length} total notes
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedNotes.map((note) => {
          const ProgramIcon = getProgramIcon(note.program);
          return (
            <div key={note.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {note.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="font-medium">{note.course}</span>
                    <span>•</span>
                    <span>{note.fileSize}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getProgramColor(note.program)}`}>
                  <ProgramIcon className="w-3 h-3" />
                  <span>{note.program}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{note.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{note.rating}</span>
                    <span>({note.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{note.downloads.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(note.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{note.author}</span>
                  {note.authorType === 'official' && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      Official
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 text-sm font-medium transition-all duration-200 flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all duration-200 flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {sortedNotes.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}

      {/* Load More */}
      {sortedNotes.length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200">
            Load More Notes
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesHub;