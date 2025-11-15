
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useIconContext } from '../context/IconContext';
import Tooltip from './Tooltip';

interface GeneratorViewProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const GeneratorView: React.FC<GeneratorViewProps> = ({ prompt, setPrompt, onGenerate, isLoading }) => {
  const { t } = useLanguage();
  const { getIconComponent } = useIconContext();
  const GenerateIcon = getIconComponent('generateAction');

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl flex flex-col h-full p-4 shadow-2xl shadow-black/20">
      <h2 className="text-xl font-semibold text-gray-200 mb-2 border-b border-white/10 pb-2">{t('generatorTitle')}</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={t('generatorPlaceholder')}
        className="w-full flex-grow bg-slate-900/50 text-gray-200 p-3 rounded-md font-mono text-sm border border-white/10 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none resize-none"
      />
      <div className="mt-4">
        <Tooltip text={t('tooltipGenerateFromPrompt')}>
          <button
            onClick={onGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full relative inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 opacity-50 blur-lg group-hover:opacity-75 transition duration-500 animate-pulse"></span>
            <span className="relative flex items-center justify-center">
                {isLoading ? t('buttonGenerating') : <><GenerateIcon className="h-5 w-5 mr-2" /> {t('buttonGenerate')}</>}
            </span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default GeneratorView;
