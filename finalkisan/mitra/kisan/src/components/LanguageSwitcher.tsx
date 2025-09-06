import { useState } from 'react';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

const LanguageSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
      <SelectTrigger className="w-auto min-w-[120px] bg-white/80 backdrop-blur-sm border-white/20 shadow-soft">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-agri-primary" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20 shadow-large">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="hover:bg-agri-light/50 transition-colors"
          >
            <div className="flex flex-col">
              <span className="font-medium">{lang.name}</span>
              <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;