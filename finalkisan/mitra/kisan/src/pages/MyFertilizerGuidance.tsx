import { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  CheckCircle,
  Clock,
  Droplets,
  Leaf,
  Calendar,
  Beaker,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyFertilizerGuidance = () => {
  const navigate = useNavigate();
  const [savedGuidance, setSavedGuidance] = useState<string[]>([]);
  const [appliedGuidance, setAppliedGuidance] = useState<string[]>(() => {
    const applied = localStorage.getItem('kisanmitra_applied_guidance');
    return applied ? JSON.parse(applied) : [];
  });
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  // Load saved fertilizer guidance
  useEffect(() => {
    const saved = localStorage.getItem('kisanmitra_saved_fertilizer_guides');
    setSavedGuidance(saved ? JSON.parse(saved) : []);
  }, []);

  const cropData = {
    'tomato': {
      name: 'Tomato',
      image: '🍅',
      season: 'Kharif/Rabi',
      fertilizers: [
        { name: 'NPK (10:26:26)', quantity: '200 kg/acre', timing: 'At planting', method: 'Basal application', notes: 'Mix with soil before transplanting' },
        { name: 'Urea (46% N)', quantity: '50 kg/acre', timing: '20 days after transplant', method: 'Side dressing', notes: 'Apply around plant base, avoid stems' },
        { name: 'Calcium Nitrate', quantity: '25 kg/acre', timing: 'Flowering stage', method: 'Foliar spray', notes: 'Prevents blossom end rot' }
      ],
      steps: [
        'Prepare field with proper drainage',
        'Apply basal fertilizer 1 week before transplanting',
        'Transplant healthy seedlings',
        'Apply first top dressing after 20 days',
        'Monitor plant growth and adjust as needed'
      ]
    },
    'wheat': {
      name: 'Wheat',
      image: '🌾',
      season: 'Rabi',
      fertilizers: [
        { name: 'DAP (18:46:0)', quantity: '150 kg/acre', timing: 'At sowing', method: 'Drill with seed', notes: 'Place 2-3 cm below seed level' },
        { name: 'Urea (46% N)', quantity: '65 kg/acre', timing: '1st irrigation (21 days)', method: 'Broadcasting', notes: 'Apply before irrigation' },
        { name: 'Urea (46% N)', quantity: '65 kg/acre', timing: '2nd irrigation (45 days)', method: 'Broadcasting', notes: 'Apply during tillering stage' }
      ],
      steps: [
        'Test soil pH (ideal 6.0-7.5)',
        'Apply basal dose with seed drilling',
        'Ensure proper seed depth (4-5 cm)',
        'First top dressing at crown root stage',
        'Second top dressing at tillering',
        'Monitor for nutrient deficiency signs'
      ]
    },
    'rice': {
      name: 'Rice',
      image: '🌾',
      season: 'Kharif',
      fertilizers: [
        { name: 'NPK (12:32:16)', quantity: '125 kg/acre', timing: 'Before transplanting', method: 'Broadcasting', notes: 'Mix thoroughly with puddled soil' },
        { name: 'Urea (46% N)', quantity: '45 kg/acre', timing: '15 days after transplant', method: 'Broadcasting', notes: 'Apply in standing water' },
        { name: 'Urea (46% N)', quantity: '45 kg/acre', timing: 'At panicle initiation', method: 'Broadcasting', notes: 'Apply during tillering stage' }
      ],
      steps: [
        'Prepare puddled field with standing water',
        'Apply basal fertilizer 2-3 days before transplanting',
        'Transplant 21-day old seedlings',
        'Maintain water level at 2-5 cm',
        'Apply nitrogen in split doses',
        'Drain field 10 days before harvest'
      ]
    },
    'cotton': {
      name: 'Cotton',
      image: '☁️',
      season: 'Kharif',
      fertilizers: [
        { name: 'NPK (17:17:17)', quantity: '100 kg/acre', timing: 'At sowing', method: 'Side placement', notes: 'Place 3-4 cm away from seed' },
        { name: 'Urea (46% N)', quantity: '60 kg/acre', timing: '30-35 days after sowing', method: 'Side dressing', notes: 'Apply during square formation' },
        { name: 'MOP (60% K2O)', quantity: '35 kg/acre', timing: 'At flowering', method: 'Broadcasting', notes: 'Helps in boll development' }
      ],
      steps: [
        'Select well-drained black cotton soil',
        'Apply pre-sowing fertilizers',
        'Sow seeds at proper depth (2-3 cm)',
        'First top dressing during square stage',
        'Second application at flowering',
        'Monitor for pink bollworm'
      ]
    },
    'maize': {
      name: 'Maize',
      image: '🌽',
      season: 'Kharif/Rabi',
      fertilizers: [
        { name: 'NPK (12:32:16)', quantity: '125 kg/acre', timing: 'At sowing', method: 'Band placement', notes: 'Place 5 cm away and below seed' },
        { name: 'Urea (46% N)', quantity: '65 kg/acre', timing: '25-30 days after sowing', method: 'Side dressing', notes: 'Apply at knee-high stage' },
        { name: 'Urea (46% N)', quantity: '65 kg/acre', timing: 'Pre-tasseling stage', method: 'Side dressing', notes: 'Apply 50-55 days after sowing' }
      ],
      steps: [
        'Choose well-drained fertile soil',
        'Apply basal dose at time of sowing',
        'Maintain plant spacing of 60x20 cm',
        'First top dressing at knee-high stage',
        'Second top dressing before tasseling',
        'Ensure adequate moisture throughout'
      ]
    }
  };

  const toggleAppliedStatus = (cropId: string) => {
    const updatedApplied = appliedGuidance.includes(cropId)
      ? appliedGuidance.filter(id => id !== cropId)
      : [...appliedGuidance, cropId];
    
    setAppliedGuidance(updatedApplied);
    localStorage.setItem('kisanmitra_applied_guidance', JSON.stringify(updatedApplied));
  };

  const toggleExpandCard = (cropId: string) => {
    setExpandedCards(prev => 
      prev.includes(cropId) 
        ? prev.filter(id => id !== cropId)
        : [...prev, cropId]
    );
  };

  const savedCrops = savedGuidance.map(id => ({
    id,
    ...cropData[id as keyof typeof cropData]
  })).filter(crop => crop.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/advisory')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="p-3 bg-green-100 rounded-xl">
              <Beaker className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Fertilizer Guidance</h1>
              <p className="text-sm text-gray-600">Your saved crop fertilizer recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {savedCrops.length > 0 ? (
          <div className="space-y-6">
            {savedCrops.map((crop) => {
              const isApplied = appliedGuidance.includes(crop.id);
              const isExpanded = expandedCards.includes(crop.id);
              
              return (
                <Card key={crop.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Crop Header */}
                  <CardHeader className={`${
                    isApplied 
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200' 
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{crop.image}</div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-gray-900">{crop.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <span className="text-green-700 font-medium">{crop.season} Season</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isApplied && (
                          <div className="flex items-center space-x-1 text-green-600 bg-green-100 px-3 py-1 rounded-full">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Applied</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {/* Fertilizer Table */}
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                        <Droplets className="w-5 h-5 text-blue-600" />
                        <span>Fertilizer Schedule</span>
                      </h3>
                      
                      <div className="space-y-3">
                        {crop.fertilizers.map((fertilizer, index) => (
                          <div key={index} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-lg">{fertilizer.name}</h4>
                                <p className="text-green-600 font-bold text-base">{fertilizer.quantity}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-1 text-blue-600">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm font-medium">{fertilizer.timing}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600">Method:</span>
                                <span className="text-sm text-gray-800 font-medium">{fertilizer.method}</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <span className="text-sm font-medium text-gray-600 mt-0.5">Notes:</span>
                                <span className="text-sm text-gray-700 leading-relaxed">{fertilizer.notes}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Steps */}
                    <div className="mt-6">
                      <button
                        onClick={() => toggleExpandCard(crop.id)}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl hover:from-blue-100 hover:to-purple-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Leaf className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-gray-900">Step-by-Step Instructions</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 space-y-3">
                          {crop.steps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-xl border border-gray-200">
                              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-green-600">{index + 1}</span>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Apply Status Button */}
                    <div className="mt-6">
                      <Button
                        onClick={() => toggleAppliedStatus(crop.id)}
                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                          isApplied
                            ? 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-3">
                          {isApplied ? (
                            <>
                              <Clock className="w-6 h-6" />
                              <span>Mark as Pending</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-6 h-6" />
                              <span>Mark as Applied</span>
                            </>
                          )}
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="p-4 bg-gray-100 rounded-xl w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Beaker className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">No Saved Guidance</h3>
              <p className="text-gray-500 text-base mb-6">
                Save fertilizer guidance from the Fertilizer Guide page to see them here
              </p>
              <Button 
                onClick={() => navigate('/fertilizer-guide')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-2xl font-semibold"
              >
                Browse Fertilizer Guide
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyFertilizerGuidance;