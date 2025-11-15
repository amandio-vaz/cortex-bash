import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useIconContext } from '../context/IconContext';
import Tooltip from './Tooltip';
import { ValidationIssue } from '../types';
import { ArrowsPointingOutIcon, ArrowsPointingInIcon, SaveIcon } from '../icons';

const SeverityIcon: React.FC<{ severity: 'error' | 'warning' | 'performance' }> = ({ severity }) => {
  const iconMap = {
    error: (
      <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
    performance: (
      <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
  };
  return iconMap[severity];
};

interface ScriptEditorProps {
  script: string;
  setScript: (script: string) => void;
  onSave: () => void;
  onAnalyze: () => void;
  onImprove: () => void;
  onValidate: () => void;
  onAutoValidate: () => void;
  isLoading: boolean;
  showSaveNotification: boolean;
  issues: ValidationIssue[];
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({ script, setScript, onSave, onAnalyze, onImprove, onValidate, onAutoValidate, isLoading, showSaveNotification, issues, isFullscreen, onToggleFullscreen }) => {
  const { t } = useLanguage();
  const { getIconComponent } = useIconContext();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const LINE_HEIGHT = 20; // Corresponde ao text-sm e leading-tight no Tailwind
  const PADDING_TOP = 12; // Corresponde ao p-3

  useEffect(() => {
    // Dispara a validação automática com um atraso de 1 segundo após o usuário parar de digitar.
    const validationTimeout = setTimeout(() => {
      onAutoValidate();
    }, 1000);

    // Limpa o timeout se o script mudar novamente antes do atraso terminar.
    return () => clearTimeout(validationTimeout);
  }, [script, onAutoValidate]);

  const handleScroll = () => {
    if (textareaRef.current) {
      setScrollTop(textareaRef.current.scrollTop);
    }
  };

  const AnalyzeIcon = getIconComponent('analyze');
  const ValidateIcon = getIconComponent('validate');
  const ImproveIcon = getIconComponent('improve');

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl flex flex-col h-full p-4 relative shadow-2xl shadow-black/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">{t('editorTitle')}</h2>
        <Tooltip text={isFullscreen ? t('tooltipExitFullscreen') : t('tooltipEnterFullscreen')}>
          <button 
            onClick={onToggleFullscreen}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />}
          </button>
        </Tooltip>
      </div>
      <div className="w-full flex-grow relative">
        <textarea
          ref={textareaRef}
          value={script}
          onChange={(e) => setScript(e.target.value)}
          onScroll={handleScroll}
          placeholder={t('editorPlaceholder')}
          className="w-full h-full bg-slate-900/50 text-gray-200 p-3 pl-8 rounded-md font-mono text-sm border border-white/10 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none resize-none leading-tight"
          style={{ whiteSpace: 'pre', overflowWrap: 'normal' }}
          wrap="off"
        />
        <div 
            className="absolute top-0 left-0 h-full w-full pointer-events-none"
            style={{ transform: `translateY(-${scrollTop}px)` }}
        >
            {issues.filter(issue => issue.line !== null).map((issue, index) => (
                <div
                    key={index}
                    className="absolute left-2 group pointer-events-auto"
                    style={{ top: `${PADDING_TOP + (issue.line! - 1) * LINE_HEIGHT}px` }}
                >
                    <SeverityIcon severity={issue.severity} />
                    <div className="absolute left-full ml-2 w-max max-w-xs bg-black/60 backdrop-blur-md text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 border border-white/10 shadow-lg">
                        {`[${issue.severity.toUpperCase()}] ${issue.message}`}
                    </div>
                </div>
            ))}
        </div>
      </div>
      <div
        className={`absolute bottom-20 right-4 bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg transition-opacity duration-500 pointer-events-none border border-white/10 ${
          showSaveNotification ? 'opacity-100' : 'opacity-0'
        }`}
        aria-live="polite"
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {t('saveNotification')}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <Tooltip text={t('tooltipSave')}>
          <button
            onClick={onSave}
            disabled={isLoading}
            className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-br from-gray-500 to-gray-600 group-hover:from-gray-500 group-hover:to-gray-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-full relative px-4 py-2 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center justify-center">
              <SaveIcon className="h-5 w-5 mr-2" /> {t('buttonSave')}
            </span>
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipAnalyze')}>
          <button
            onClick={onAnalyze}
            disabled={isLoading || !script}
            className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-full relative px-4 py-2 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center justify-center">
              <AnalyzeIcon className="h-5 w-5 mr-2" /> {t('buttonAnalyze')}
            </span>
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipValidate')}>
          <button
            onClick={onValidate}
            disabled={isLoading || !script}
            className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-br from-yellow-500 to-orange-500 group-hover:from-yellow-500 group-hover:to-orange-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-full relative px-4 py-2 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center justify-center">
              <ValidateIcon className="h-5 w-5 mr-2" /> {t('buttonValidate')}
            </span>
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipImprove')}>
          <button
            onClick={onImprove}
            disabled={isLoading || !script}
            className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-br from-green-500 to-teal-500 group-hover:from-green-500 group-hover:to-teal-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-full relative px-4 py-2 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center justify-center">
              <ImproveIcon className="h-5 w-5 mr-2" /> {t('buttonImprove')}
            </span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ScriptEditor;