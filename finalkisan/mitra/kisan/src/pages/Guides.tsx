import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Play, 
  Star,
  Clock,
  Download,
  Bookmark,
  ChevronRight,
  Sprout,
  Droplets,
  Sun,
  Bug,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Guides = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Guides', icon: BookOpen },
    { id: 'planting', name: 'Planting', icon: Sprout },
    { id: 'irrigation', name: 'Irrigation', icon: Droplets },
    { id: 'pest-control', name: 'Pest Control', icon: Bug },
    { id: 'harvesting', name: 'Harvesting', icon: Calendar },
    { id: 'market', name: 'Marketing', icon: TrendingUp }
  ];

  const guides = [
    {
      id: '1',
      title: 'Complete Tomato Growing Guide',
      description: 'From seed to harvest - everything you need to know about growing healthy tomatoes',
      category: 'planting',
      difficulty: 'Beginner',
      duration: '15 min read',
      rating: 4.8,
      reviews: 1234,
      image: '/placeholder.svg',
      featured: true,
      downloadable: true,
      hasVideo: true,
      tags: ['Vegetables', 'Indoor', 'Year-round'],
      author: 'Dr. Rajesh Kumar',
      updatedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Modern Drip Irrigation Setup',
      description: 'Save water and increase yield with efficient drip irrigation systems',
      category: 'irrigation',
      difficulty: 'Intermediate',
      duration: '12 min read',
      rating: 4.6,
      reviews: 856,
      image: '/placeholder.svg',
      featured: false,
      downloadable: true,
      hasVideo: true,
      tags: ['Water Management', 'Technology', 'Cost-effective'],
      author: 'Priya Sharma',
      updatedDate: '2024-01-10'
    },
    {
      id: '3',
      title: 'Organic Pest Control Methods',
      description: 'Natural and safe pest control techniques for healthy crops',
      category: 'pest-control',
      difficulty: 'Beginner',
      duration: '10 min read',
      rating: 4.9,
      reviews: 2156,
      image: '/placeholder.svg',
      featured: true,
      downloadable: false,
      hasVideo: false,
      tags: ['Organic', 'Natural', 'Safe'],
      author: 'Ramesh Patel',
      updatedDate: '2024-01-18'
    },
    {
      id: '4',
      title: 'Wheat Harvesting Best Practices',
      description: 'Maximize your wheat yield with proper harvesting techniques',
      category: 'harvesting',
      difficulty: 'Advanced',
      duration: '18 min read',
      rating: 4.7,
      reviews: 634,
      image: '/placeholder.svg',
      featured: false,
      downloadable: true,
      hasVideo: true,
      tags: ['Wheat', 'Timing', 'Equipment'],
      author: 'Suresh Singh',
      updatedDate: '2024-01-12'
    },
    {
      id: '5',
      title: 'Digital Marketing for Farmers',
      description: 'Sell your produce online and reach more customers',
      category: 'market',
      difficulty: 'Intermediate',
      duration: '14 min read',
      rating: 4.5,
      reviews: 423,
      image: '/placeholder.svg',
      featured: false,
      downloadable: false,
      hasVideo: true,
      tags: ['Online Sales', 'Digital', 'Business'],
      author: 'Anjali Verma',
      updatedDate: '2024-01-08'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredGuides = guides.filter(guide => guide.featured);

  return (
    <div className="mobile-container bg-agri-light-gray">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/home')}>
            <ArrowLeft className="w-6 h-6 text-agri-gray" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">Cultivation Guides</h1>
        </div>
        
        <button>
          <Bookmark className="w-6 h-6 text-agri-gray" />
        </button>
      </div>

      {/* Content */}
      <div className="mobile-content space-y-6 pt-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-gray" />
          <Input
            placeholder="Search guides, topics, crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 text-base bg-white border-agri-light-gray rounded-xl"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-agri-primary text-white'
                  : 'bg-white text-agri-gray border border-agri-light-gray'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Section */}
        {selectedCategory === 'all' && featuredGuides.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-text-secondary">Featured Guides</h2>
            <div className="space-y-4">
              {featuredGuides.slice(0, 2).map((guide) => (
                <div key={guide.id} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-agri-light-gray">
                  <div className="relative">
                    <div className="h-40 bg-agri-light flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-agri-primary" />
                    </div>
                    
                    {guide.hasVideo && (
                      <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 bg-black/70 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    
                    <Badge className="absolute top-4 right-4 bg-agri-warning text-white">
                      Featured
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getDifficultyColor(guide.difficulty)}>
                        {guide.difficulty}
                      </Badge>
                      <span className="text-sm text-agri-gray">•</span>
                      <span className="text-sm text-agri-gray">{guide.duration}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-text-secondary mb-2">{guide.title}</h3>
                    <p className="text-agri-gray text-sm mb-4 line-clamp-2">{guide.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{guide.rating}</span>
                        </div>
                        <span className="text-sm text-agri-gray">({guide.reviews})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {guide.downloadable && (
                          <button className="p-2 bg-agri-light rounded-lg">
                            <Download className="w-4 h-4 text-agri-primary" />
                          </button>
                        )}
                        <button className="p-2 bg-agri-light rounded-lg">
                          <Bookmark className="w-4 h-4 text-agri-primary" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-1 border-agri-primary text-agri-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => navigate(`/guides/${guide.id}`)}
                      className="w-full bg-agri-primary hover:bg-agri-secondary text-white"
                    >
                      Read Guide
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Guides */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-secondary">
              {selectedCategory === 'all' ? 'All Guides' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-agri-gray">{filteredGuides.length} guides</span>
          </div>

          <div className="space-y-4">
            {filteredGuides.map((guide) => (
              <div 
                key={guide.id} 
                className="bg-white rounded-2xl p-4 shadow-soft border border-agri-light-gray hover:shadow-medium transition-shadow"
                onClick={() => navigate(`/guides/${guide.id}`)}
              >
                <div className="flex space-x-4">
                  {/* Guide Thumbnail */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-agri-light rounded-xl flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-agri-primary" />
                    </div>
                    {guide.hasVideo && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-white ml-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Guide Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={`${getDifficultyColor(guide.difficulty)} text-xs px-2 py-0.5`}>
                            {guide.difficulty}
                          </Badge>
                          <span className="text-xs text-agri-gray">•</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-agri-gray" />
                            <span className="text-xs text-agri-gray">{guide.duration}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-text-secondary text-sm mb-1 line-clamp-2">{guide.title}</h3>
                        <p className="text-xs text-agri-gray mb-2 line-clamp-2">{guide.description}</p>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{guide.rating}</span>
                          </div>
                          <span className="text-xs text-agri-gray">by {guide.author}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        {guide.downloadable && (
                          <button 
                            className="p-1.5 bg-agri-light rounded-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle download
                            }}
                          >
                            <Download className="w-3 h-3 text-agri-primary" />
                          </button>
                        )}
                        
                        <button 
                          className="p-1.5 bg-agri-light rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle bookmark
                          }}
                        >
                          <Bookmark className="w-3 h-3 text-agri-primary" />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {guide.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5 border-agri-primary text-agri-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-agri-gray mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-secondary mb-2">No guides found</h3>
            <p className="text-agri-gray mb-6">Try adjusting your search or browse different categories</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="border-agri-primary text-agri-primary hover:bg-agri-light"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Quick Access */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-text-secondary mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/guides/seasonal')}
              className="flex flex-col items-center p-4 bg-agri-light rounded-xl hover:bg-agri-light-gray transition-colors"
            >
              <Calendar className="w-8 h-8 text-agri-primary mb-2" />
              <span className="text-sm font-medium text-text-secondary">Seasonal Guide</span>
            </button>
            
            <button 
              onClick={() => navigate('/guides/problems')}
              className="flex flex-col items-center p-4 bg-agri-light rounded-xl hover:bg-agri-light-gray transition-colors"
            >
              <Bug className="w-8 h-8 text-agri-primary mb-2" />
              <span className="text-sm font-medium text-text-secondary">Problem Solver</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;