import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  TrendingUp,
  MapPin,
  Star,
  Clock,
  User,
  Building,
  DollarSign,
  Search,
  Filter
} from 'lucide-react';

interface CareerGuidanceProps {
  user: any;
}

const CareerGuidance: React.FC<CareerGuidanceProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('experiences');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const internshipExperiences = [
    {
      id: 1,
      title: 'Software Engineering Internship at TechCorp Malaysia',
      company: 'TechCorp Malaysia',
      location: 'Kuala Lumpur',
      duration: '6 months',
      salary: 'RM 800/month',
      program: 'Bachelor\'s',
      field: 'Software Engineering',
      rating: 4.8,
      author: 'Ahmad Rahman',
      date: '2024-01-15',
      description: 'Amazing experience working on full-stack web development. Got hands-on experience with React, Node.js, and AWS cloud services.',
      highlights: [
        'Developed 3 major features for company\'s main product',
        'Worked with agile development methodology',
        'Mentored by senior developers',
        'Got pre-placement offer'
      ],
      skills: ['React', 'Node.js', 'AWS', 'MongoDB', 'Git'],
      tips: 'Focus on building a strong portfolio with personal projects. The interview process included technical coding challenges.'
    },
    {
      id: 2,
      title: 'Data Science Internship at Analytics Plus',
      company: 'Analytics Plus',
      location: 'Johor Bahru',
      duration: '4 months',
      salary: 'RM 1200/month',
      program: 'Masters',
      field: 'Data Science',
      rating: 4.6,
      author: 'Sarah Chen',
      date: '2024-02-01',
      description: 'Worked on machine learning models for customer behavior analysis. Great exposure to real-world data problems.',
      highlights: [
        'Built predictive models with 95% accuracy',
        'Presented findings to C-level executives',
        'Led data visualization initiatives',
        'Published internal research paper'
      ],
      skills: ['Python', 'TensorFlow', 'SQL', 'Tableau', 'Statistics'],
      tips: 'Master Python and SQL before applying. Having a strong mathematical background really helps in understanding complex algorithms.'
    },
    {
      id: 3,
      title: 'Research Assistant Position - AI Lab',
      company: 'UTMKL AI Research Lab',
      location: 'Skudai, Johor',
      duration: '8 months',
      salary: 'RM 600/month',
      program: 'PhD',
      field: 'Artificial Intelligence',
      rating: 4.9,
      author: 'Dr. Lisa Wong',
      date: '2024-01-20',
      description: 'Conducted cutting-edge research in natural language processing. Published 2 papers in international conferences.',
      highlights: [
        'Published in top-tier AI conferences',
        'Collaborated with international researchers',
        'Developed novel NLP algorithms',
        'Supervised undergraduate projects'
      ],
      skills: ['Deep Learning', 'NLP', 'PyTorch', 'Research', 'Academic Writing'],
      tips: 'Start reading research papers early and try to implement algorithms from scratch. Good communication skills are essential for research.'
    },
    {
      id: 4,
      title: 'Mobile App Development at StartupHub',
      company: 'StartupHub',
      location: 'Cyberjaya',
      duration: '5 months',
      salary: 'RM 900/month',
      program: 'Bachelor\'s',
      field: 'Mobile Development',
      rating: 4.4,
      author: 'David Kim',
      date: '2024-02-10',
      description: 'Developed mobile applications for iOS and Android. Fast-paced startup environment with lots of learning opportunities.',
      highlights: [
        'Built 2 apps from concept to deployment',
        'Worked directly with founders',
        'Learned startup culture and mindset',
        'Gained experience in user-centered design'
      ],
      skills: ['Swift', 'Kotlin', 'React Native', 'UI/UX', 'Firebase'],
      tips: 'Be prepared for a fast-paced environment. Show initiative and be ready to wear multiple hats in a startup setting.'
    }
  ];

  const careerPaths = [
    {
      title: 'Software Engineer',
      level: 'Entry Level',
      salary: 'RM 3,500 - 5,500',
      growth: '+15% annually',
      description: 'Design and develop software applications using various programming languages.',
      requirements: ['Bachelor\'s in Computer Science', '2+ years experience', 'Strong programming skills'],
      companies: ['TechCorp', 'Microsoft Malaysia', 'Grab', 'Shopee']
    },
    {
      title: 'Data Scientist',
      level: 'Mid Level',
      salary: 'RM 6,000 - 12,000',
      growth: '+20% annually',
      description: 'Analyze complex data to help organizations make informed decisions.',
      requirements: ['Master\'s preferred', 'Python/R proficiency', 'Statistical knowledge'],
      companies: ['Maybank', 'Genting', 'AirAsia', 'CIMB Bank']
    },
    {
      title: 'Research Scientist',
      level: 'Senior Level',
      salary: 'RM 8,000 - 15,000',
      growth: '+12% annually',
      description: 'Conduct advanced research in AI, machine learning, and emerging technologies.',
      requirements: ['PhD preferred', 'Published research', 'Deep technical expertise'],
      companies: ['Google Research', 'Microsoft Research', 'Universities', 'R&D Centers']
    }
  ];

  const mentorshipProgram = [
    {
      name: 'Dr. Ahmad Zulkifli',
      title: 'Senior Software Architect',
      company: 'Microsoft Malaysia',
      expertise: 'Cloud Computing, Software Architecture',
      experience: '12 years',
      mentees: 15,
      rating: 4.9,
      program: 'Available for Bachelor\'s & Masters'
    },
    {
      name: 'Sarah Abdullah',
      title: 'Data Science Lead',
      company: 'Grab Malaysia',
      expertise: 'Machine Learning, Big Data',
      experience: '8 years',
      mentees: 10,
      rating: 4.7,
      program: 'Available for Masters & PhD'
    },
    {
      name: 'Prof. Dr. Chen Wei',
      title: 'Research Director',
      company: 'UTMKL Research Institute',
      expertise: 'AI Research, Publications',
      experience: '15 years',
      mentees: 25,
      rating: 4.8,
      program: 'Available for PhD students'
    }
  ];

  const filteredExperiences = internshipExperiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.field.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || exp.program === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Guidance</h1>
        <p className="text-gray-600">
          Learn from real experiences, explore career paths, and connect with mentors in your field.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex space-x-1 p-2">
          {[
            { id: 'experiences', label: 'Internship Experiences', icon: Briefcase },
            { id: 'paths', label: 'Career Paths', icon: TrendingUp },
            { id: 'mentorship', label: 'Find Mentors', icon: GraduationCap }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
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

      {/* Content */}
      {activeTab === 'experiences' && (
        <div>
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search experiences by company, field, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Programs</option>
                <option value="Foundation">Foundation</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExperiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {experience.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Building className="w-4 h-4" />
                      <span>{experience.company}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{experience.salary}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getProgramColor(experience.program)}`}>
                    {experience.program}
                  </div>
                </div>

                {/* Rating and Author */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-sm">{experience.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{experience.author}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{experience.date}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{experience.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                      {skill}
                    </span>
                  ))}
                  {experience.skills.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                      +{experience.skills.length - 4} more
                    </span>
                  )}
                </div>

                {/* Action */}
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium">
                  Read Full Experience
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'paths' && (
        <div className="space-y-6">
          {careerPaths.map((path, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.title}</h3>
                      <p className="text-gray-600">{path.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      {path.level}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {path.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Top Hiring Companies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.companies.map((company, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Salary Range</span>
                    </div>
                    <p className="text-lg font-semibold text-green-700">{path.salary}</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Growth Rate</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-700">{path.growth}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'mentorship' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mentorshipProgram.map((mentor, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                  <p className="text-blue-600 font-medium">{mentor.title}</p>
                  <p className="text-gray-600 text-sm">{mentor.company}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium text-sm">{mentor.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2"><strong>Expertise:</strong> {mentor.expertise}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Experience:</strong> {mentor.experience}</p>
                <p className="text-sm text-gray-600"><strong>Current Mentees:</strong> {mentor.mentees}</p>
              </div>

              <div className="mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  {mentor.program}
                </span>
              </div>

              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium">
                Request Mentorship
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;