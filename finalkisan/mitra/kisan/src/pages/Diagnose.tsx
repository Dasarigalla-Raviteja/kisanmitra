import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  Mic,
  ChevronDown,
  ChevronUp,
  Sun,
  Eye,
  Shield,
  Sparkles,
  Globe,
  Check,
  Leaf,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlantDiagnosis = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const languages = ['English', 'हिंदी', 'தமிழ்', 'తెలుగు', 'বাংলা'];

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleVoiceAssist = () => {
    setIsListening(!isListening);
    // Voice assistance logic would go here
  };

  const startDiagnosis = () => {
    if (selectedImage) {
      // Navigate to diagnosis results
      console.log('Starting diagnosis...');
    }
  };

  const tips = [
    {
      icon: <Sun className="w-5 h-5 text-yellow-500" />,
      title: "Good Lighting",
      description: "Take photos in natural daylight"
    },
    {
      icon: <Eye className="w-5 h-5 text-blue-500" />,
      title: "Focus on Affected Area",
      description: "Zoom in on diseased or damaged parts"
    },
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      title: "Avoid Shadows",
      description: "Keep the plant well-lit and clear"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      title: "Clear & Sharp",
      description: "Ensure the image is not blurry"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
            <Leaf className="w-6 h-6 mr-2" />
            Plant Diagnosis
          </h1>
          
          <div className="w-12" />
        </div>
      </div>
      
      <div className="px-4 py-6">
        <div className="bg-white shadow-sm border-b border-green-100 rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Leaf className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Plant Diagnosis</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <div className="relative">
                <select 
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="appearance-none bg-green-50 border-2 border-green-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[100px]"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <Globe className="absolute right-3 top-3.5 w-4 h-4 text-green-600 pointer-events-none" />
              </div>
              
              {/* Voice Assistant Button */}
              <button
                onClick={toggleVoiceAssist}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                <Mic className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Main Action Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-6">
              <Camera className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Capture Plant Image
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Take a clear photo or upload from your gallery
            </p>
          </div>

          {selectedImage && (
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 border-4 border-green-200">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 rounded-xl p-2">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-center text-base text-green-600 mt-4 font-bold">
                ✓ Image ready for diagnosis
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {/* Take Photo Button */}
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center justify-center space-x-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Camera className="w-7 h-7" />
              <span className="font-bold text-xl">Take a Photo</span>
            </button>

            {/* Upload from Gallery Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center space-x-4 bg-white border-3 border-green-500 text-green-600 hover:bg-green-50 p-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              <Upload className="w-7 h-7" />
              <span className="font-bold text-xl">Upload from Gallery</span>
            </button>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Photography Tips Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-lg">Photography Tips</h3>
                <p className="text-base text-gray-600">Get better diagnosis results</p>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-500" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-500" />
            )}
          </button>

          {isExpanded && (
            <div className="px-8 py-6 space-y-6 bg-gray-50">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-1">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">
                      {tip.title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Info Card */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-6 border-2 border-green-100">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white rounded-xl">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                AI-Powered Plant Health Analysis
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Our advanced AI can identify diseases, pests, nutrient deficiencies, 
                and provide treatment recommendations in your local language.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-6 shadow-2xl">
        <button
          onClick={startDiagnosis}
          disabled={!selectedImage}
          className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 ${
            selectedImage
              ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedImage ? (
            <div className="flex items-center justify-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>Start Diagnosis</span>
            </div>
          ) : (
            'Select an Image First'
          )}
        </button>
      </div>

      {/* Voice Assistant Feedback */}
      {isListening && (
        <div className="fixed top-20 left-4 right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg z-50">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">Listening... Speak your question</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDiagnosis;