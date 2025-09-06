import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin,
  Building,
  GraduationCap,
  Mail,
  Phone,
  LinkedinIcon,
  Filter,
  Star,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface AlumniDirectoryProps {
  user: any;
}

const AlumniDirectory: React.FC<AlumniDirectoryProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const alumni = [
    {
      id: 1,
      name: 'Dr. Ahmad Zulkifli',
      program: 'PhD Computer Science',
      graduationYear: 2018,
      currentPosition: 'Senior Software Architect',
      company: 'Microsoft Malaysia',
      industry: 'Technology',
      location: 'Kuala Lumpur',
      experience: '12 years',
      expertise: ['Cloud Computing', 'Software Architecture', 'Team Leadership'],
      email: 'ahmad.z@microsoft.com',
      linkedin: 'ahmad-zulkifli',
      phone: '+60123456789',
      mentoring: true,
      rating: 4.9,
      totalMentees: 15,
      bio: 'Passionate about cloud technologies and building scalable systems. Love mentoring junior developers.',
      achievements: ['Microsoft MVP', 'Tech Lead of Azure Team', '20+ Technical Patents']
    },
    {
      id: 2,
      name: 'Sarah Abdullah',
      program: 'Masters Data Science',
      graduationYear: 2020,
      currentPosition: 'Data Science Lead',
      company: 'Grab Malaysia',
      industry: 'Technology',
      location: 'Cyberjaya',
      experience: '8 years',
      expertise: ['Machine Learning', 'Big Data', 'Product Analytics'],
      email: 'sarah.abdullah@grab.com',
      linkedin: 'sarah-abdullah-data',
      phone: '+60198765432',
      mentoring: true,
      rating: 4.7,
      totalMentees: 10,
      bio: 'Data science enthusiast who loves solving complex business problems with AI and ML.',
      achievements: ['Top 100 Data Scientists Malaysia', 'Published 5 Research Papers', 'TEDx Speaker']
    },
    {
      id: 3,
      name: 'Chen Wei Ming',
      program: 'Bachelor Software Engineering',
      graduationYear: 2019,
      currentPosition: 'Product Manager',
      company: 'Shopee Malaysia',
      industry: 'E-commerce',
      location: 'Kuala Lumpur',
      experience: '6 years',
      expertise: ['Product Strategy', 'User Experience', 'Agile Development'],
      email: 'chen.wei@shopee.com',
      linkedin: 'chen-wei-ming-pm',
      phone: '+60187654321',
      mentoring: true,
      rating: 4.8,
      totalMentees: 8,
      bio: 'Product manager with a passion for creating user-centric digital experiences.',
      achievements: ['Led 3 Major Product Launches', 'PMP Certified', 'Startup Advisor']
    },
    {
      id: 4,
      name: 'Dr. Maria Santos',
      program: 'PhD Artificial Intelligence',
      graduationYear: 2017,
      currentPosition: 'Research Scientist',
      company: 'Google Research',
      industry: 'Technology',
      location: 'Singapore',
      experience: '10 years',
      expertise: ['Natural Language Processing', 'Deep Learning', 'Research'],
      email: 'maria.santos@google.com',
      linkedin: 'dr-maria-santos-ai',
      phone: '+6512345678',
      mentoring: true,
      rating: 4.9,
      totalMentees: 25,
      bio: 'AI researcher focused on making language AI more accessible and ethical.',
      achievements: ['50+ Publications', 'Google Research Award', 'ACL Best Paper Award']
    },
    {
      id: 5,
      name: 'Raj Kumar',
      program: 'Masters Cybersecurity',
      graduationYear: 2021,
      currentPosition: 'Security Consultant',
      company: 'Deloitte Malaysia',
      industry: 'Consulting',
      location: 'Kuala Lumpur',
      experience: '5 years',
      expertise: ['Penetration Testing', 'Risk Assessment', 'Security Architecture'],
      email: 'raj.kumar@deloitte.com',
      linkedin: 'raj-kumar-security',
      phone: '+60156789123',
      mentoring: false,
      rating: 4.6,
      totalMentees: 0,
      bio: 'Cybersecurity expert helping organizations protect their digital assets.',
      achievements: ['CISSP Certified', 'CEH Certified', 'Led 50+ Security Audits']
    },
    {
      id: 6,
      name: 'Lisa Tan',
      program: 'Bachelor Computer Science',
      graduationYear: 2020,
      currentPosition: 'Frontend Developer',
      company: 'AirAsia Digital',
      industry: 'Travel Technology',
      location: 'Sepang',
      experience: '4 years',
      expertise: ['React.js', 'Vue.js', 'UI/UX Design'],
      email: 'lisa.tan@airasia.com',
      linkedin: 'lisa-tan-frontend',
      phone: '+60134567890',
      mentoring: true,
      rating: 4.5,
      totalMentees: 3,
      bio: 'Frontend developer passionate about creating beautiful and accessible web experiences.',
      achievements: ['UI/UX Design Award', 'Open Source Contributor', 'Tech Conference Speaker']
    }
  ];

  const industries = ['Technology', 'E-commerce', 'Consulting', 'Travel Technology', 'Finance', 'Healthcare'];
  const programs = ['PhD Computer Science', 'Masters Data Science', 'Bachelor Software Engineering', 'PhD Artificial Intelligence', 'Masters Cybersecurity', 'Bachelor Computer Science'];
  const graduationYears = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProgram = selectedProgram === 'all' || alum.program.includes(selectedProgram);
    const matchesIndustry = selectedIndustry === 'all' || alum.industry === selectedIndustry;
    const matchesYear = selectedYear === 'all' || alum.graduationYear.toString() === selectedYear;
    
    return matchesSearch && matchesProgram && matchesIndustry && matchesYear;
  });

  const getProgramColor = (program: string) => {
    if (program.includes('PhD')) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (program.includes('Masters')) return 'text-purple-600 bg-purple-50 border-purple-200';
    if (program.includes('Bachelor')) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Alumni Directory</h1>
        <p className="text-gray-600">
          Connect with UTMKL alumni for networking, mentorship, and career guidance.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Programs</option>
            <option value="PhD">PhD</option>
            <option value="Masters">Masters</option>
            <option value="Bachelor">Bachelor's</option>
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Years</option>
            {graduationYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {filteredAlumni.length} alumni {searchTerm && `for "${searchTerm}"`}
        </p>
        <div className="text-sm text-gray-500">
          {filteredAlumni.filter(a => a.mentoring).length} available for mentoring
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAlumni.map((alum) => (
          <div key={alum.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{alum.name}</h3>
                  <p className="text-blue-600 font-medium">{alum.currentPosition}</p>
                  <p className="text-gray-600 text-sm">{alum.company}</p>
                </div>
              </div>
              {alum.mentoring && (
                <div className="flex flex-col items-end space-y-1">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Available for Mentoring
                  </span>
                  {alum.totalMentees > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{alum.rating} ({alum.totalMentees} mentees)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Program and Details */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getProgramColor(alum.program)}`}>
                  {alum.program}
                </span>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Class of {alum.graduationYear}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{alum.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{alum.bio}</p>
            </div>

            {/* Expertise */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Expertise:</h4>
              <div className="flex flex-wrap gap-2">
                {alum.expertise.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                    {skill}
                  </span>
                ))}
                {alum.expertise.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                    +{alum.expertise.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Key Achievements:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {alum.achievements.slice(0, 2).map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-1">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Actions */}
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>
              <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm text-gray-700">
                <Mail className="w-4 h-4" />
              </button>
              <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm text-gray-700">
                <LinkedinIcon className="w-4 h-4" />
              </button>
              {alum.mentoring && (
                <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-200 text-sm font-medium">
                  Request Mentoring
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}

      {/* Statistics Footer */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-semibold mb-4">Alumni Network Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">{alumni.length}</div>
            <div className="text-blue-200 text-sm">Total Alumni</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{alumni.filter(a => a.mentoring).length}</div>
            <div className="text-blue-200 text-sm">Available Mentors</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{industries.length}+</div>
            <div className="text-blue-200 text-sm">Industries</div>
          </div>
          <div>
            <div className="text-3xl font-bold">95%</div>
            <div className="text-blue-200 text-sm">Employment Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectory;