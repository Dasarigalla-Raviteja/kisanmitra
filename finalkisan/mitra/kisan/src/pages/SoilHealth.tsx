import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Eye, Bookmark, Droplets, Beaker, Leaf, Wheat, TreePine, TestTube2, AlertCircle, CheckCircle, Info, X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SoilTest {
  id: string;
  date: string;
  pH: { value: number; status: 'acidic' | 'neutral' | 'alkaline' };
  nitrogen: { value: string; status: 'low' | 'medium' | 'high' };
  phosphorus: { value: string; status: 'low' | 'medium' | 'high' };
  potassium: { value: string; status: 'low' | 'medium' | 'high' };
  moisture: { value: string; status: 'low' | 'adequate' | 'high' };
  recommendation: string;
  detailedGuidance: {
    fertilizer: string;
    crops: string[];
    irrigation: string;
  };
  expanded: boolean;
}

const SoilHealth = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Sample soil test data - latest first
  const [soilTests, setSoilTests] = useState<SoilTest[]>([
    {
      id: '1',
      date: 'Sept 5, 2025',
      pH: { value: 6.8, status: 'neutral' },
      nitrogen: { value: 'Medium', status: 'medium' },
      phosphorus: { value: 'Low', status: 'low' },
      potassium: { value: 'High', status: 'high' },
      moisture: { value: 'Adequate', status: 'adequate' },
      recommendation: 'Apply Phosphorus fertilizer 40kg/acre',
      detailedGuidance: {
        fertilizer: 'Apply DAP fertilizer 40kg/acre before sowing. Add organic compost 2 tons/acre for better soil health.',
        crops: ['🌾 Wheat', '🌾 Barley', '🌻 Mustard', '🥔 Potato'],
        irrigation: 'Drip irrigation twice weekly. Maintain 70% soil moisture during flowering stage.'
      },
      expanded: false
    },
    {
      id: '2',
      date: 'Aug 28, 2025',
      pH: { value: 5.8, status: 'acidic' },
      nitrogen: { value: 'High', status: 'high' },
      phosphorus: { value: 'Medium', status: 'medium' },
      potassium: { value: 'Low', status: 'low' },
      moisture: { value: 'Low', status: 'low' },
      recommendation: 'Apply Lime 200kg/acre to balance pH',
      detailedGuidance: {
        fertilizer: 'Apply lime 200kg/acre. Add Potash fertilizer 30kg/acre. Use organic manure 1.5 tons/acre.',
        crops: ['🌽 Maize', '🌾 Rice', '🥜 Groundnut', '🌿 Green gram'],
        irrigation: 'Increase watering frequency. Use sprinkler irrigation daily during dry season.'
      },
      expanded: false
    },
    {
      id: '3',
      date: 'Aug 15, 2025',
      pH: { value: 7.2, status: 'alkaline' },
      nitrogen: { value: 'Low', status: 'low' },
      phosphorus: { value: 'High', status: 'high' },
      potassium: { value: 'Medium', status: 'medium' },
      moisture: { value: 'High', status: 'high' },
      recommendation: 'Apply Nitrogen fertilizer and reduce watering',
      detailedGuidance: {
        fertilizer: 'Apply Urea 50kg/acre in split doses. Add organic compost to improve soil structure.',
        crops: ['🌾 Wheat', '🌻 Sunflower', '🌿 Soybean', '🥬 Cabbage'],
        irrigation: 'Reduce watering frequency. Monitor soil moisture to prevent waterlogging.'
      },
      expanded: false
    }
  ]);

  const [formData, setFormData] = useState({
    soilTexture: '',
    soilColor: '',
    moisture: '',
    cropHistory: '',
    fertilizerHistory: '',
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moistureLevel: ''
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': case 'adequate': case 'neutral': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'high': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'acidic': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'alkaline': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': case 'acidic': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': case 'adequate': case 'neutral': return 'text-green-600 bg-green-50 border-green-200';
      case 'high': case 'alkaline': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const toggleExpanded = (testId: string) => {
    setSoilTests(prev => prev.map(test => 
      test.id === testId ? { ...test, expanded: !test.expanded } : test
    ));
  };

  const saveGuidance = (testId: string) => {
    const test = soilTests.find(t => t.id === testId);
    if (test) {
      // Save to Advisory -> My Soil Guidance
      const savedGuidance = {
        id: testId,
        date: test.date,
        summary: test.recommendation,
        detailed: test.detailedGuidance,
        saved: new Date().toLocaleDateString()
      };
      
      // In real app, this would save to localStorage or API
      alert(`✅ Soil guidance saved successfully!\n\nSaved to: Advisory → My Soil Guidance\nTest Date: ${test.date}\nRecommendation: ${test.recommendation}`);
    }
  };

  const handleAddTest = () => {
    if (!formData.soilTexture || !formData.moisture) {
      alert('Please fill in required fields: Soil Texture and Moisture');
      return;
    }

    const newTest: SoilTest = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      pH: { 
        value: parseFloat(formData.pH) || 6.5, 
        status: parseFloat(formData.pH) < 6.0 ? 'acidic' : parseFloat(formData.pH) > 7.0 ? 'alkaline' : 'neutral' 
      },
      nitrogen: { 
        value: formData.nitrogen || 'Medium', 
        status: (formData.nitrogen?.toLowerCase() === 'low' ? 'low' : formData.nitrogen?.toLowerCase() === 'high' ? 'high' : 'medium') as 'low' | 'medium' | 'high'
      },
      phosphorus: { 
        value: formData.phosphorus || 'Medium', 
        status: (formData.phosphorus?.toLowerCase() === 'low' ? 'low' : formData.phosphorus?.toLowerCase() === 'high' ? 'high' : 'medium') as 'low' | 'medium' | 'high'
      },
      potassium: { 
        value: formData.potassium || 'Medium', 
        status: (formData.potassium?.toLowerCase() === 'low' ? 'low' : formData.potassium?.toLowerCase() === 'high' ? 'high' : 'medium') as 'low' | 'medium' | 'high'
      },
      moisture: { 
        value: formData.moisture, 
        status: (formData.moisture.toLowerCase() === 'low' ? 'low' : formData.moisture.toLowerCase() === 'high' ? 'high' : 'adequate') as 'low' | 'adequate' | 'high'
      },
      recommendation: 'Apply balanced fertilizer based on soil analysis',
      detailedGuidance: {
        fertilizer: 'Apply NPK fertilizer as per soil test results. Add organic matter to improve soil health.',
        crops: ['🌾 Suitable crops based on soil condition'],
        irrigation: 'Maintain optimal moisture levels based on crop requirements.'
      },
      expanded: false
    };

    setSoilTests(prev => [newTest, ...prev]);
    setShowAddForm(false);
    setFormData({
      soilTexture: '', soilColor: '', moisture: '', cropHistory: '', 
      fertilizerHistory: '', pH: '', nitrogen: '', phosphorus: '', potassium: '', moistureLevel: ''
    });
    alert('✅ New soil test added successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-emerald-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20 rounded-full p-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-xl font-bold text-white flex items-center">
            <TestTube2 className="w-6 h-6 mr-2" />
            Soil Health Monitoring
          </h1>
          
          <div className="w-12" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Soil Test Cards */}
        {soilTests.map((test) => (
          <Card key={test.id} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-5 border-b border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-green-800 bg-green-100 px-3 py-1 rounded-full">
                    {test.date}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-600">Test #{test.id}</div>
                  </div>
                </div>

                {/* Key Parameters */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* pH */}
                  <div className={`p-3 rounded-2xl border ${getStatusColor(test.pH.status)} flex items-center justify-between`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(test.pH.status)}
                      <span className="font-medium text-sm">pH</span>
                    </div>
                    <div className="font-bold text-sm">{test.pH.value}</div>
                  </div>

                  {/* Nitrogen */}
                  <div className={`p-3 rounded-2xl border ${getStatusColor(test.nitrogen.status)} flex items-center justify-between`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(test.nitrogen.status)}
                      <span className="font-medium text-sm">N</span>
                    </div>
                    <div className="font-bold text-sm">{test.nitrogen.value}</div>
                  </div>

                  {/* Phosphorus */}
                  <div className={`p-3 rounded-2xl border ${getStatusColor(test.phosphorus.status)} flex items-center justify-between`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(test.phosphorus.status)}
                      <span className="font-medium text-sm">P</span>
                    </div>
                    <div className="font-bold text-sm">{test.phosphorus.value}</div>
                  </div>

                  {/* Potassium */}
                  <div className={`p-3 rounded-2xl border ${getStatusColor(test.potassium.status)} flex items-center justify-between`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(test.potassium.status)}
                      <span className="font-medium text-sm">K</span>
                    </div>
                    <div className="font-bold text-sm">{test.potassium.value}</div>
                  </div>
                </div>

                {/* Moisture */}
                <div className={`p-4 rounded-2xl border ${getStatusColor(test.moisture.status)} flex items-center justify-between mb-4`}>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-5 h-5" />
                    <span className="font-medium">Moisture</span>
                  </div>
                  <div className="font-bold">{test.moisture.value}</div>
                </div>

                {/* Quick Recommendation */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                  <div className="flex items-start space-x-2">
                    <Leaf className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800 text-sm mb-1">Quick Recommendation</div>
                      <div className="text-blue-700 text-sm">{test.recommendation}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 flex space-x-3">
                <Button 
                  onClick={() => toggleExpanded(test.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </Button>
                
                <Button 
                  onClick={() => saveGuidance(test.id)}
                  variant="outline"
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50 rounded-2xl py-3 flex items-center justify-center space-x-2"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Save Guidance</span>
                </Button>
              </div>

              {/* Expanded Details */}
              {test.expanded && (
                <div className="border-t border-gray-100 p-5 bg-gray-50/50 space-y-4">
                  {/* Fertilizer Guidance */}
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                    <div className="flex items-start space-x-2">
                      <Beaker className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-amber-800 mb-2">🌾 Fertilizer Guidance</div>
                        <div className="text-amber-700 text-sm leading-relaxed">{test.detailedGuidance.fertilizer}</div>
                      </div>
                    </div>
                  </div>

                  {/* Crop Suggestions */}
                  <div className="bg-green-50 border border-green-200 p-4 rounded-2xl">
                    <div className="flex items-start space-x-2">
                      <Wheat className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-green-800 mb-2">🌱 Recommended Crops</div>
                        <div className="flex flex-wrap gap-2">
                          {test.detailedGuidance.crops.map((crop, index) => (
                            <div key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              {crop}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Irrigation Tips */}
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                    <div className="flex items-start space-x-2">
                      <Droplets className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-blue-800 mb-2">💧 Irrigation Tips</div>
                        <div className="text-blue-700 text-sm leading-relaxed">{test.detailedGuidance.irrigation}</div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button for Expanded View */}
                  <div className="pt-2">
                    <Button 
                      onClick={() => saveGuidance(test.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3 flex items-center justify-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Complete Guidance to Advisory</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-200"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>

      {/* Add New Soil Test Modal/Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[90vh] rounded-t-3xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-green-600 p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add New Soil Test</h2>
              <Button 
                onClick={() => setShowAddForm(false)}
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/20 rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form Content */}
            <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Required Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Texture *</label>
                  <select 
                    value={formData.soilTexture}
                    onChange={(e) => setFormData(prev => ({ ...prev, soilTexture: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select soil texture</option>
                    <option value="clay">Clay</option>
                    <option value="loam">Loam</option>
                    <option value="sandy">Sandy</option>
                    <option value="silt">Silt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Color</label>
                  <input 
                    type="text"
                    value={formData.soilColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, soilColor: e.target.value }))}
                    placeholder="e.g., Dark brown, Red, Black"
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Moisture Level *</label>
                  <select 
                    value={formData.moisture}
                    onChange={(e) => setFormData(prev => ({ ...prev, moisture: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select moisture level</option>
                    <option value="Low">Low</option>
                    <option value="Adequate">Adequate</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop History</label>
                  <input 
                    type="text"
                    value={formData.cropHistory}
                    onChange={(e) => setFormData(prev => ({ ...prev, cropHistory: e.target.value }))}
                    placeholder="Previous crops grown"
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer History</label>
                  <input 
                    type="text"
                    value={formData.fertilizerHistory}
                    onChange={(e) => setFormData(prev => ({ ...prev, fertilizerHistory: e.target.value }))}
                    placeholder="Recent fertilizers used"
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Optional IoT Sensor Data */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Optional: IoT Sensor Data</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">pH Level</label>
                    <input 
                      type="number"
                      value={formData.pH}
                      onChange={(e) => setFormData(prev => ({ ...prev, pH: e.target.value }))}
                      placeholder="6.5"
                      step="0.1"
                      min="0" max="14"
                      className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nitrogen</label>
                    <select 
                      value={formData.nitrogen}
                      onChange={(e) => setFormData(prev => ({ ...prev, nitrogen: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phosphorus</label>
                    <select 
                      value={formData.phosphorus}
                      onChange={(e) => setFormData(prev => ({ ...prev, phosphorus: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Potassium</label>
                    <select 
                      value={formData.potassium}
                      onChange={(e) => setFormData(prev => ({ ...prev, potassium: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="border-t bg-gray-50 p-5 flex space-x-3">
              <Button 
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-100 rounded-2xl py-3"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddTest}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3"
              >
                Save Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilHealth;