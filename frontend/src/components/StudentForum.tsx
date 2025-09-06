import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  MessageCircle, 
  Star,
  Clock,
  User,
  Award,
  TrendingUp,
  Hash,
  Search
} from 'lucide-react';

interface StudentForumProps {
  user: any;
}

const StudentForum: React.FC<StudentForumProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  const discussions = [
    {
      id: 1,
      title: 'Data Structures Assignment Help Needed',
      content: 'I\'m struggling with implementing binary trees. Can anyone share their approach or some helpful resources?',
      author: 'Ahmad Rahman',
      authorProgram: 'Bachelor\'s',
      timestamp: '2 hours ago',
      replies: 8,
      likes: 12,
      tags: ['Data Structures', 'Programming', 'Help'],
      isHot: true,
      lastReply: {
        author: 'Sarah Chen',
        timestamp: '30 minutes ago'
      }
    },
    {
      id: 2,
      title: 'Calculus Study Group - Week 5',
      content: 'Hi everyone! I\'ve uploaded my calculus notes for this week. Let\'s discuss the integration problems from Chapter 7.',
      author: 'Lisa Wong',
      authorProgram: 'Foundation',
      timestamp: '5 hours ago',
      replies: 15,
      likes: 24,
      tags: ['Mathematics', 'Study Group', 'Calculus'],
      isHot: false,
      lastReply: {
        author: 'David Kim',
        timestamp: '1 hour ago'
      }
    },
    {
      id: 3,
      title: 'Research Methodology - PhD Experience',
      content: 'For fellow PhD students, I wanted to share my experience with qualitative research methods. Happy to answer questions!',
      author: 'Dr. Candidate Alex',
      authorProgram: 'PhD',
      timestamp: '1 day ago',
      replies: 6,
      likes: 18,
      tags: ['PhD', 'Research', 'Methodology'],
      isHot: false,
      lastReply: {
        author: 'Maria Santos',
        timestamp: '3 hours ago'
      }
    },
    {
      id: 4,
      title: 'Software Engineering Project Ideas',
      content: 'Looking for innovative project ideas for my final year project. What trends are you seeing in the industry?',
      author: 'John Martinez',
      authorProgram: 'Bachelor\'s',
      timestamp: '2 days ago',
      replies: 22,
      likes: 35,
      tags: ['Software Engineering', 'Projects', 'Final Year'],
      isHot: true,
      lastReply: {
        author: 'Tech Enthusiast',
        timestamp: '4 hours ago'
      }
    }
  ];

  const topContributors = [
    { name: 'Sarah Chen', points: 342, posts: 28, program: 'Masters' },
    { name: 'Ahmad Rahman', points: 298, posts: 24, program: 'Bachelor\'s' },
    { name: 'Lisa Wong', points: 256, posts: 19, program: 'Foundation' }
  ];

  const getProgramColor = (program: string) => {
    switch (program) {
      case 'Foundation': return 'text-green-600 bg-green-50';
      case 'Bachelor\'s': return 'text-blue-600 bg-blue-50';
      case 'Masters': return 'text-purple-600 bg-purple-50';
      case 'PhD': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Forum</h1>
          <p className="text-gray-600">Connect, share knowledge, and collaborate with fellow UTMKL students through SINet</p>
        </div>
        <button className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Discussion</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Tabs */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-1">
              {[
                { id: 'recent', label: 'Recent', icon: Clock },
                { id: 'hot', label: 'Hot Topics', icon: TrendingUp },
                { id: 'my-posts', label: 'My Posts', icon: User }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discussions */}
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <div key={discussion.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                        {discussion.title}
                      </h3>
                      {discussion.isHot && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Hot</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{discussion.content}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg flex items-center space-x-1">
                      <Hash className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Stats and Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{discussion.author}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getProgramColor(discussion.authorProgram)}`}>
                        {discussion.authorProgram}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{discussion.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{discussion.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{discussion.replies}</span>
                    </div>
                  </div>
                </div>

                {/* Last Reply */}
                {discussion.lastReply && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Last reply by <span className="font-medium">{discussion.lastReply.author}</span> {discussion.lastReply.timestamp}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Contributors */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Top Contributors</span>
            </h3>
            <div className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{contributor.name}</p>
                    <p className="text-xs text-gray-500">{contributor.points} points • {contributor.posts} posts</p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getProgramColor(contributor.program)}`}>
                    {contributor.program}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Forum Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Forum Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Discussions</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Members</span>
                <span className="font-semibold">567</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Week</span>
                <span className="font-semibold">89 posts</span>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Community Guidelines</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Be respectful and helpful</li>
              <li>• Search before posting</li>
              <li>• Use clear, descriptive titles</li>
              <li>• Tag your posts appropriately</li>
              <li>• No spam or self-promotion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForum;