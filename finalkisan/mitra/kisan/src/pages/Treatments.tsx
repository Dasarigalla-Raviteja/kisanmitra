import { useState } from 'react';
import { 
  Plus, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Camera,
  Edit3,
  Mic,
  Globe,
  TrendingUp,
  Droplets,
  Bug,
  Leaf,
  Clock,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

const ActiveTreatments = () => {
  const [expandedCards, setExpandedCards] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeFilter, setActiveFilter] = useState('active'); // 'active', 'completed', or 'all'
  
  const languages = {
    en: { label: 'English', flag: '🇬🇧' },
    hi: { label: 'हिन्दी', flag: '🇮🇳' },
    ta: { label: 'தமிழ்', flag: '🇮🇳' }
  };

  const allTreatments = [
    {
      id: 1,
      cropName: 'Tomato',
      disease: 'Early Blight',
      severity: 'moderate',
      startDate: '2025-08-28',
      totalDays: 21,
      currentDay: 8,
      status: 'active',
      nextAction: {
        title: 'Apply fungicide spray',
        dueTime: 'Tomorrow, 6:00 AM',
        overdue: false
      },
      products: [
        { name: 'Copper Fungicide', used: 65, total: 100, unit: 'ml', icon: '💧' },
        { name: 'Bio Booster', used: 30, total: 50, unit: 'ml', icon: '🌱' }
      ],
      notes: 'Leaves showing improvement after first application',
      photos: 2
    },
    {
      id: 2,
      cropName: 'Rice Paddy',
      disease: 'Leaf Blast',
      severity: 'high',
      startDate: '2025-08-25',
      totalDays: 14,
      currentDay: 11,
      status: 'active',
      nextAction: {
        title: 'Final fungicide application',
        dueTime: 'Overdue by 2 days',
        overdue: true
      },
      products: [
        { name: 'Tricyclazole', used: 80, total: 100, unit: 'g', icon: '💊' },
        { name: 'Sticker Solution', used: 45, total: 50, unit: 'ml', icon: '💧' }
      ],
      notes: 'Disease progression stopped, new growth appearing healthy',
      photos: 4
    },
    {
      id: 3,
      cropName: 'Chili',
      disease: 'Powdery Mildew',
      severity: 'low',
      startDate: '2025-09-01',
      totalDays: 10,
      currentDay: 4,
      status: 'active',
      nextAction: {
        title: 'Apply neem oil spray',
        dueTime: 'Today, 5:30 PM',
        overdue: false
      },
      products: [
        { name: 'Neem Oil', used: 20, total: 100, unit: 'ml', icon: '🌿' }
      ],
      notes: 'Early detection, expecting quick recovery',
      photos: 1
    },
    {
      id: 4,
      cropName: 'Wheat',
      disease: 'Rust Disease',
      severity: 'moderate',
      startDate: '2025-08-15',
      totalDays: 18,
      currentDay: 18,
      status: 'completed',
      completedDate: '2025-09-02',
      products: [
        { name: 'Rust Fungicide', used: 100, total: 100, unit: 'ml', icon: '💧' }
      ],
      notes: 'Treatment completed successfully, crop recovered fully',
      photos: 6
    },
    {
      id: 5,
      cropName: 'Cotton',
      disease: 'Bollworm Attack',
      severity: 'high',
      startDate: '2025-08-10',
      totalDays: 12,
      currentDay: 12,
      status: 'completed',
      completedDate: '2025-08-22',
      products: [
        { name: 'Bt Pesticide', used: 150, total: 150, unit: 'ml', icon: '🐛' },
        { name: 'Growth Booster', used: 75, total: 75, unit: 'ml', icon: '🌱' }
      ],
      notes: 'Excellent results, pest control achieved',
      photos: 8
    }
  ];

  // Filter treatments based on active filter
  const treatments = allTreatments.filter(treatment => {
    if (activeFilter === 'all') return true;
    return treatment.status === activeFilter;
  });

  const summaryData = {
    active: allTreatments.filter(t => t.status === 'active').length,
    completed: allTreatments.filter(t => t.status === 'completed').length,
    successRate: 87
  };

  const toggleExpand = (id) => {
    setExpandedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    );
  };

  const getSeverityStyle = (severity) => {
    switch(severity) {
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressPercentage = (current, total) => {
    return Math.round((current / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Active Treatments</h1>
            <div className="flex items-center space-x-2">
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <Mic className="w-5 h-5 text-gray-600" />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
                <span className="text-lg">{languages[selectedLanguage].flag}</span>
                <span className="text-sm font-medium text-gray-700">{languages[selectedLanguage].label}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Strip with Filter Buttons */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveFilter('active')}
            className={`rounded-2xl p-4 transition-all duration-200 ${
              activeFilter === 'active' 
                ? 'bg-blue-100 border-2 border-blue-400 shadow-lg' 
                : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-blue-600 mb-1">Active</p>
              <p className="text-2xl font-bold text-blue-700">{summaryData.active}</p>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveFilter('completed')}
            className={`rounded-2xl p-4 transition-all duration-200 ${
              activeFilter === 'completed' 
                ? 'bg-green-100 border-2 border-green-400 shadow-lg' 
                : 'bg-green-50 border border-green-200 hover:bg-green-100'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-green-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-700">{summaryData.completed}</p>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveFilter('all')}
            className={`rounded-2xl p-4 transition-all duration-200 ${
              activeFilter === 'all' 
                ? 'bg-purple-100 border-2 border-purple-400 shadow-lg' 
                : 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-purple-600 mb-1">All</p>
              <p className="text-2xl font-bold text-purple-700">{summaryData.active + summaryData.completed}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Treatment Cards */}
      <div className="px-6 pb-24 space-y-6">
        {treatments.map(treatment => {
          const isExpanded = expandedCards.includes(treatment.id);
          const progress = getProgressPercentage(treatment.currentDay, treatment.totalDays);
          const isCompleted = treatment.status === 'completed';
          
          return (
            <div key={treatment.id} className={`bg-white rounded-3xl shadow-md border overflow-hidden ${
              isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
            }`}>
              {/* Main Card Content */}
              <div className="p-6">
                {/* Header Row */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{treatment.cropName}</h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getSeverityStyle(treatment.severity)} uppercase tracking-wide`}>
                        {treatment.severity}
                      </span>
                    </div>
                    <p className="text-base text-gray-600 font-medium">{treatment.disease}</p>
                  </div>
                  <button
                    onClick={() => toggleExpand(treatment.id)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Day {treatment.currentDay} of {treatment.totalDays}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{progress}% Complete</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Next Action or Completion Status */}
                {isCompleted ? (
                  <div className="p-5 rounded-2xl bg-green-50 border-2 border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-100">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 mb-1">Treatment Completed</p>
                        <p className="text-base font-medium text-green-800 mb-2">Successfully treated on {treatment.completedDate}</p>
                        <p className="text-sm text-green-700 font-medium">
                          ✓ 100% Progress Complete
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`p-5 rounded-2xl ${treatment.nextAction.overdue ? 'bg-orange-50 border-2 border-orange-200' : 'bg-blue-50 border-2 border-blue-100'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${treatment.nextAction.overdue ? 'bg-orange-100' : 'bg-blue-100'}`}>
                          <Clock className={`w-5 h-5 ${treatment.nextAction.overdue ? 'text-orange-600' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 mb-1">Next Action</p>
                          <p className="text-base font-medium text-gray-800 mb-2">{treatment.nextAction.title}</p>
                          <p className="text-sm text-gray-600">
                            {treatment.nextAction.overdue && (
                              <span className="inline-flex items-center space-x-2 text-orange-700 font-medium">
                                <AlertCircle className="w-4 h-4" />
                                <span>{treatment.nextAction.dueTime}</span>
                              </span>
                            )}
                            {!treatment.nextAction.overdue && (
                              <span className="text-blue-700 font-medium">{treatment.nextAction.dueTime}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-white text-green-600 font-bold border-2 border-green-300 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center space-x-2">
                      <Check className="w-5 h-5" />
                      <span>Mark Complete</span>
                    </button>
                  </div>
                )}

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    {/* Products Used */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Products Used</p>
                      <div className="space-y-2">
                        {treatment.products.map((product, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{product.icon}</span>
                              <span className="text-sm text-gray-700">{product.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Remaining</p>
                                <p className="text-sm font-medium text-gray-700">
                                  {product.total - product.used}{product.unit}
                                </p>
                              </div>
                              <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${((product.total - product.used) / product.total) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Photos & Notes */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">Progress Photos & Notes</p>
                        <button className="text-blue-600 text-sm hover:text-blue-700">
                          View All
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Camera className="w-4 h-4" />
                          <span className="text-sm">{treatment.photos} photos</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Edit3 className="w-4 h-4" />
                          <span className="text-sm truncate max-w-[200px]">{treatment.notes}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                          <Camera className="w-4 h-4" />
                          <span>Add Photo</span>
                        </button>
                        <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                          <Edit3 className="w-4 h-4" />
                          <span>Add Note</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ActiveTreatments;