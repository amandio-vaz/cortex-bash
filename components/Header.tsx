import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ICON_LIBRARY, SunIcon, MoonIcon } from '../icons';
import Tooltip from './Tooltip';
import { useAppearance } from '../context/ThemeContext';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { t } = useLanguage();
  const { appearance, toggleAppearance } = useAppearance();
  const SettingsIcon = ICON_LIBRARY.settings.Gear;

  return (
    <header className="p-4 text-center relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 dark:opacity-50"></div>
      
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Tooltip text={appearance === 'light' ? t('tooltipThemeDark') : t('tooltipThemeLight')}>
            <button
                onClick={toggleAppearance}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle theme"
            >
                {appearance === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
        </Tooltip>
        <Tooltip text={t('tooltipCustomizeInterface')}>
          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200"
            aria-label="Open settings"
          >
            <SettingsIcon className="h-6 w-6" />
          </button>
        </Tooltip>
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-transparent">
        <span className="dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-purple-500">
          {t('headerTitle')}
        </span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
        {t('headerSubtitle')}
      </p>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 dark:opacity-30"></div>
    </header>
  );
};

export default Header;