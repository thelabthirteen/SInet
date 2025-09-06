import React, { useState } from 'react';
import { 
  Globe, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  Phone,
  Mail,
  Bell,
  User,
  Plane
} from 'lucide-react';

interface InternationalSupportProps {
  user: any;
}

const InternationalSupport: React.FC<InternationalSupportProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for international students
  const studentData = {
    visaStatus: {
      type: 'Student Pass',
      issueDate: '2023-02-15',
      expiryDate: '2025-02-14',
      daysUntilExpiry: 87,
      status: 'valid'
    },
    passport: {
      number: 'A12345678',
      expiryDate: '2027-06-20',
      daysUntilExpiry: 892,
      status: 'valid'
    },
    nextActions: [
      {
        id: 1,
        type: 'visa_renewal',
        title: 'Student Pass Renewal Due',
        description: 'Submit renewal application 3 months before expiry',
        dueDate: '2024-11-14',
        priority: 'high',
        completed: false
      },
      {
        id: 2,
        type: 'medical_exam',
        title: 'Medical Examination Required',
        description: 'Annual medical check-up for international students',
        dueDate: '2024-12-01',
        priority: 'medium',
        completed: false
      },
      {
        id: 3,
        type: 'passport_submission',
        title: 'Passport Submission to International Office',
        description: 'Submit passport for Student Pass endorsement',
        dueDate: '2024-03-15',
        priority: 'high',
        completed: true
      }
    ]
  };

  const documents = [
    {
      id: 1,
      name: 'Student Pass',
      type: 'Immigration Document',
      status: 'valid',
      expiryDate: '2025-02-14',
      downloadUrl: '#'
    },
    {
      id: 2,
      name: 'Passport Copy',
      type: 'Identity Document',
      status: 'valid',
      expiryDate: '2027-06-20',
      downloadUrl: '#'
    },
    {
      id: 3,
      name: 'Medical Certificate',
      type: 'Health Document',
      status: 'expires_soon',
      expiryDate: '2024-12-01',
      downloadUrl: '#'
    },
    {
      id: 4,
      name: 'Travel Authorization',
      type: 'Immigration Document',
      status: 'valid',
      expiryDate: '2025-01-30',
      downloadUrl: '#'
    }
  ];

  const guidelines = [
    {
      id: 1,
      title: 'Student Pass Renewal Process',
      category: 'Immigration',
      lastUpdated: '2024-01-15',
      content: {
        overview: 'Student Pass must be renewed before expiry. Application should be submitted 3 months in advance.',
        requirements: [
          'Completed renewal form',
          'Original passport',
          'Recent passport-sized photographs',
          'Medical examination report',
          'Letter from academic department',
          'Financial guarantee documents'
        ],
        process: [
          'Submit application to International Office',
          'Pay renewal fees',
          'Attend medical examination',
          'Wait for approval (2-4 weeks)',
          'Collect renewed Student Pass'
        ],
        fees: 'RM 150 (subject to change)',
        timeline: '6-8 weeks processing time'
      }
    },
    {
      id: 2,
      title: 'Travel Authorization Guidelines',
      category: 'Travel',
      lastUpdated: '2024-01-10',
      content: {
        overview: 'International students must obtain travel authorization before leaving Malaysia.',
        requirements: [
          'Valid Student Pass',
          'Letter from academic supervisor',
          'Travel itinerary',
          'Return ticket confirmation'
        ],
        process: [
          'Submit application 2 weeks before travel',
          'Get approval from International Office',
          'Collect signed authorization letter',
          'Present at immigration checkpoint'
        ],
        fees: 'No fee required',
        timeline: '3-5 working days'
      }
    },
    {
      id: 3,
      title: 'Medical Examination Requirements',
      category: 'Health',
      lastUpdated: '2024-01-05',
      content: {
        overview: 'Annual medical examination is mandatory for all international students.',
        requirements: [
          'Valid identification',
          'Previous medical reports',
          'Vaccination records'
        ],
        process: [
          'Book appointment at approved clinic',
          'Complete medical examination',
          'Collect medical certificate',
          'Submit to International Office'
        ],
        fees: 'RM 200-300 (varies by clinic)',
        timeline: 'Results available in 3-5 days'
      }
    }
  ];

  const contacts = [
    {
      name: 'International Student Services',
      department: 'International Office',
      email: 'international@utm.my',
      phone: '+607-555-2345',
      location: 'Level 2, Canselori Building',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Immigration Consultation',
      department: 'Student Affairs',
      email: 'immigration@utm.my',
      phone: '+607-555-3456',
      location: 'Level 1, Student Hub',
      hours: 'Mon-Wed-Fri: 2:00 PM - 4:00 PM'
    },
    {
      name: 'Emergency Contact',
      department: 'Security Office',
      email: 'security@utm.my',
      phone: '+607-555-9999',
      location: '24/7 Hotline',
      hours: 'Available 24/7'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-50 border-green-200';
      case 'expires_soon': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'expired': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDaysUntilText = (days: number) => {
    if (days < 0) return `Expired ${Math.abs(days)} days ago`;
    if (days === 0) return 'Expires today';
    if (days === 1) return 'Expires tomorrow';
    if (days <= 30) return `${days} days remaining`;
    if (days <= 90) return `${days} days remaining`;
    return `${Math.ceil(days / 30)} months remaining`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">International Student Support</h1>
        <p className="text-gray-600">
          Track your visa status, manage renewals, and access important immigration information.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex space-x-1 p-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Globe },
            { id: 'documents', label: 'My Documents', icon: FileText },
            { id: 'guidelines', label: 'Guidelines', icon: AlertTriangle },
            { id: 'contacts', label: 'Contacts', icon: Phone }
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
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visa Status */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>Student Pass Status</span>
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(studentData.visaStatus.status)}`}>
                  {studentData.visaStatus.status === 'valid' ? 'Valid' : 'Expired'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium">{studentData.visaStatus.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expiry Date</p>
                  <p className="font-medium">{new Date(studentData.visaStatus.expiryDate).toLocaleDateString()}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-2">Time Remaining</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          studentData.visaStatus.daysUntilExpiry <= 30 ? 'bg-red-500' :
                          studentData.visaStatus.daysUntilExpiry <= 90 ? 'bg-orange-500' :
                          'bg-green-500'
                        }`}
                        style={{
                          width: `${Math.max(10, Math.min(100, (studentData.visaStatus.daysUntilExpiry / 365) * 100))}%`
                        }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${
                      studentData.visaStatus.daysUntilExpiry <= 30 ? 'text-red-600' :
                      studentData.visaStatus.daysUntilExpiry <= 90 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {getDaysUntilText(studentData.visaStatus.daysUntilExpiry)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passport Status */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>Passport Status</span>
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(studentData.passport.status)}`}>
                  Valid
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Passport Number</p>
                  <p className="font-medium">{studentData.passport.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expiry Date</p>
                  <p className="font-medium">{new Date(studentData.passport.expiryDate).toLocaleDateString()}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Time Remaining</p>
                  <p className="font-medium text-green-600">
                    {getDaysUntilText(studentData.passport.daysUntilExpiry)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Actions */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <span>Upcoming Actions</span>
              </h3>
              <div className="space-y-4">
                {studentData.nextActions
                  .filter(action => !action.completed)
                  .slice(0, 3)
                  .map((action) => (
                  <div key={action.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {action.type === 'visa_renewal' && <Globe className="w-5 h-5 text-blue-600 mt-0.5" />}
                        {action.type === 'medical_exam' && <FileText className="w-5 h-5 text-green-600 mt-0.5" />}
                        {action.type === 'passport_submission' && <Plane className="w-5 h-5 text-purple-600 mt-0.5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(action.priority)}`}>
                            {action.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((document) => (
            <div key={document.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(document.status)}`}>
                  {document.status === 'valid' ? 'Valid' : 
                   document.status === 'expires_soon' ? 'Expires Soon' : 'Expired'}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{document.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{document.type}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expires:</span>
                  <span className="font-medium">{new Date(document.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium">
                Download
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'guidelines' && (
        <div className="space-y-6">
          {guidelines.map((guideline) => (
            <div key={guideline.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{guideline.title}</h3>
                    <p className="text-gray-600 text-sm">Category: {guideline.category}</p>
                  </div>
                  <span className="text-xs text-gray-500">Updated: {guideline.lastUpdated}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Overview</h4>
                    <p className="text-gray-600 text-sm">{guideline.content.overview}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {guideline.content.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Process</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      {guideline.content.process.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h5 className="font-medium text-blue-800 mb-1">Fees</h5>
                      <p className="text-sm text-blue-700">{guideline.content.fees}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <h5 className="font-medium text-green-800 mb-1">Timeline</h5>
                      <p className="text-sm text-green-700">{guideline.content.timeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                <p className="text-blue-600 font-medium">{contact.department}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:text-blue-700">
                    {contact.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${contact.phone}`} className="text-sm text-blue-600 hover:text-blue-700">
                    {contact.phone}
                  </a>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{contact.location}</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{contact.hours}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium">
                  Contact Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InternationalSupport;