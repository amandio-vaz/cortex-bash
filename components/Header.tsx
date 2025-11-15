
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ICON_LIBRARY } from '../icons';
import Tooltip from './Tooltip';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { t } = useLanguage();
  const SettingsIcon = ICON_LIBRARY.settings.Gear;

  return (
    <header className="p-4 text-center relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
      
      <div className="absolute top-4 right-4">
        <Tooltip text="Customize Interface">
          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Open settings"
          >
            <SettingsIcon className="h-6 w-6" />
          </button>
        </Tooltip>
      </div>

      <h1 className="text-4xl font-bold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          {t('headerTitle')}
        </span>
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        {t('headerSubtitle')}
      </p>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
    </header>
  );
};

export default Header;
