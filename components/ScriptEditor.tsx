import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useIconContext } from '../context/IconContext';
import Tooltip from './Tooltip';
import CommandPalette, { Command } from './CommandPalette';
import { ValidationIssue, GithubUser } from '../types';
import { ArrowsPointingOutIcon, ArrowsPointingInIcon, SaveIcon, HistoryIcon, ChevronDownIcon, ShieldExclamationIcon, ClipboardIcon, CheckCircleIcon, GithubIcon, UndoIcon, RedoIcon } from '../icons';
import { useEditorTheme } from '../context/EditorThemeContext';

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
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onAnalyze: () => void;
  onImprove: () => void;
  onValidate: () => void;
  onExecute: (withSudo: boolean) => void;
  onAutoValidate: () => void;
  onToggleHistoryPanel: () => void;
  onToggleGithubPanel: () => void;
  isLoading: boolean;
  notificationMessage: string | null;
  issues: ValidationIssue[];
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onAddDocstrings: () => void;
  onOptimizePerformance: () => void;
  onCheckSecurity: () => void;
  githubUser: GithubUser | null;
  currentGistId: string | null;
  onUpdateGist: () => void;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({ script, setScript, onSave, onUndo, onRedo, canUndo, canRedo, onAnalyze, onImprove, onValidate, onExecute, onAutoValidate, onToggleHistoryPanel, onToggleGithubPanel, isLoading, notificationMessage, issues, isFullscreen, onToggleFullscreen, onAddDocstrings, onOptimizePerformance, onCheckSecurity, githubUser, currentGistId, onUpdateGist }) => {
  const { t } = useLanguage();
  const { getIconComponent } = useIconContext();
  const { theme } = useEditorTheme();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const executeButtonRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isExecuteMenuOpen, setIsExecuteMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const LINE_HEIGHT = 20;
  const PADDING_TOP = 12;

  const lineCount = useMemo(() => script.split('\n').length || 1, [script]);
  const lineNumbers = useMemo(() => Array.from({ length: lineCount }, (_, i) => i + 1), [lineCount]);

  useEffect(() => {
    const validationTimeout = setTimeout(() => {
      onAutoValidate();
    }, 1000);
    return () => clearTimeout(validationTimeout);
  }, [script, onAutoValidate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (executeButtonRef.current && !executeButtonRef.current.contains(event.target as Node)) {
        setIsExecuteMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScroll = () => {
    if (textareaRef.current) {
      setScrollTop(textareaRef.current.scrollTop);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const AnalyzeIcon = getIconComponent('analyze');
  const ValidateIcon = getIconComponent('validate');
  const ImproveIcon = getIconComponent('improve');
  const ExecuteIcon = getIconComponent('execute');
  const AddDocstringsIcon = getIconComponent('addDocstrings');
  const OptimizePerformanceIcon = getIconComponent('optimizePerformance');
  const CheckSecurityIcon = getIconComponent('checkSecurity');

  const commands = useMemo((): Command[] => [
    { id: 'analyze', name: t('buttonAnalyze'), icon: <AnalyzeIcon />, action: onAnalyze, disabled: isLoading || !script },
    { id: 'improve', name: t('buttonImprove'), icon: <ImproveIcon />, action: onImprove, disabled: isLoading || !script },
    { id: 'validate', name: t('buttonValidate'), icon: <ValidateIcon />, action: onValidate, disabled: isLoading || !script },
    { id: 'execute', name: t('buttonExecute'), icon: <ExecuteIcon />, action: () => onExecute(false), disabled: isLoading || !script },
    { id: 'executeSudo', name: t('buttonRunWithSudo'), icon: <ShieldExclamationIcon />, action: () => onExecute(true), disabled: isLoading || !script },
    { id: 'addDocstrings', name: t('buttonAddDocstrings'), icon: <AddDocstringsIcon />, action: onAddDocstrings, disabled: isLoading || !script },
    { id: 'optimize', name: t('buttonOptimizePerformance'), icon: <OptimizePerformanceIcon />, action: onOptimizePerformance, disabled: isLoading || !script },
    { id: 'security', name: t('buttonCheckSecurity'), icon: <CheckSecurityIcon />, action: onCheckSecurity, disabled: isLoading || !script },
  ], [t, script, isLoading, onAnalyze, onImprove, onValidate, onExecute, onAddDocstrings, onOptimizePerformance, onCheckSecurity]);

  const highlightColors = {
      error: theme.colors.highlightError,
      warning: theme.colors.highlightWarning,
      performance: theme.colors.highlightPerformance
  };

  return (
    <div className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl flex flex-col h-full p-4 relative shadow-lg dark:shadow-2xl dark:shadow-black/20"
         style={{ backgroundColor: theme.isDark ? theme.colors.resultBg : undefined }}>
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        commands={commands}
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold" style={{ color: theme.colors.resultTitle }}>{t('editorTitle')}</h2>
        <Tooltip text={isFullscreen ? t('tooltipExitFullscreen') : t('tooltipEnterFullscreen')}>
          <button 
            onClick={onToggleFullscreen}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />}
          </button>
        </Tooltip>
      </div>
      <div className="w-full flex-grow relative flex border border-gray-300 dark:border-white/10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500/50 transition-shadow"
           style={{ backgroundColor: theme.colors.editorBg }}>
        <div
          className="p-3 pr-2 text-right font-mono text-sm select-none z-10 border-r border-gray-300 dark:border-white/10"
          style={{
            lineHeight: `${LINE_HEIGHT}px`,
            color: theme.colors.lineNumbers,
            backgroundColor: theme.colors.editorGutterBg,
          }}
          aria-hidden="true"
        >
          <div style={{ transform: `translateY(-${scrollTop}px)` }}>
            {lineNumbers.map((num) => (
              <div key={num}>{num}</div>
            ))}
          </div>
        </div>

        <div className="relative flex-grow">
          <div
              className="absolute top-0 left-0 h-full w-full pointer-events-none"
              style={{ transform: `translateY(-${scrollTop}px)` }}
          >
              {issues.filter(issue => issue.line !== null).map((issue, index) => (
                  <div
                      key={index}
                      className="absolute left-0 w-full"
                      style={{ 
                        backgroundColor: highlightColors[issue.severity],
                        top: `${PADDING_TOP + (issue.line! - 1) * LINE_HEIGHT}px`, 
                        height: `${LINE_HEIGHT}px` 
                      }}
                  />
              ))}
          </div>

          <textarea
            ref={textareaRef}
            value={script}
            onChange={(e) => setScript(e.target.value)}
            onScroll={handleScroll}
            placeholder={t('editorPlaceholder')}
            className="absolute inset-0 w-full h-full bg-transparent p-3 pl-8 font-mono text-sm focus:outline-none resize-none leading-tight z-10"
            style={{ 
              color: theme.colors.editorText, 
              whiteSpace: 'pre', 
              overflowWrap: 'normal' 
            }}
            wrap="off"
            spellCheck="false"
          />
          <div 
              className="absolute top-0 left-0 h-full w-full pointer-events-none"
              style={{ transform: `translateY(-${scrollTop}px)` }}
          >
              {issues.filter(issue => issue.line !== null).map((issue, index) => (
                  <div
                      key={index}
                      className="absolute left-2 group pointer-events-auto z-20"
                      style={{ top: `${PADDING_TOP + (issue.line! - 1) * LINE_HEIGHT}px` }}
                  >
                      <SeverityIcon severity={issue.severity} />
                      <div className="absolute left-full ml-2 w-max max-w-xs bg-gray-800/90 dark:bg-black/60 backdrop-blur-md text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30 border border-gray-600 dark:border-white/10 shadow-lg">
                          {`[${issue.severity.toUpperCase()}] ${issue.message}`}
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </div>
      <div
        className={`absolute bottom-20 right-4 bg-gray-800/90 dark:bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg transition-opacity duration-500 pointer-events-none border border-gray-600 dark:border-white/10 ${
          notificationMessage ? 'opacity-100' : 'opacity-0'
        }`}
        aria-live="polite"
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {notificationMessage}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <Tooltip text={t('tooltipUndo')}>
          <button
            onClick={onUndo}
            disabled={isLoading || !canUndo}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gradient-to-br dark:from-gray-500 dark:to-gray-600 dark:hover:from-gray-500 dark:hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
          >
            <UndoIcon className="h-5 w-5 mr-2" /> {t('buttonUndo')}
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipRedo')}>
          <button
            onClick={onRedo}
            disabled={isLoading || !canRedo}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gradient-to-br dark:from-gray-500 dark:to-gray-600 dark:hover:from-gray-500 dark:hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
          >
            <RedoIcon className="h-5 w-5 mr-2" /> {t('buttonRedo')}
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipSave')}>
          <button
            onClick={onSave}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gradient-to-br dark:from-gray-500 dark:to-gray-600 dark:hover:from-gray-500 dark:hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
          >
            <SaveIcon className="h-5 w-5 mr-2" /> {t('buttonSave')}
          </button>
        </Tooltip>
        {githubUser && (
          currentGistId ? (
            <Tooltip text={t('tooltipSyncGist')}>
              <button
                onClick={onUpdateGist}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-700 dark:hover:to-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
              >
                <GithubIcon className="h-5 w-5 mr-2" /> {t('githubUpdateGist')}
              </button>
            </Tooltip>
          ) : (
            <Tooltip text={t('tooltipGithub')}>
              <button
                onClick={onToggleGithubPanel}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-700 dark:hover:to-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
              >
                <GithubIcon className="h-5 w-5 mr-2" /> {t('githubSaveNewGist')}
              </button>
            </Tooltip>
          )
        )}
        <Tooltip text={t('tooltipCopyScript')}>
          <button
            onClick={handleCopy}
            disabled={isLoading || !script || isCopied}
            className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isCopied
                    ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300 cursor-default'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gradient-to-br dark:from-gray-500 dark:to-gray-600 dark:hover:from-gray-500 dark:hover:to-gray-600'
            } focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800`}
          >
            {isCopied ? <CheckCircleIcon className="h-5 w-5 mr-2" /> : <ClipboardIcon className="h-5 w-5 mr-2" />}
            {isCopied ? t('buttonCopied') : t('buttonCopy')}
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipHistory')}>
          <button
            onClick={onToggleHistoryPanel}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gradient-to-br dark:from-gray-500 dark:to-gray-600 dark:hover:from-gray-500 dark:hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
          >
            <HistoryIcon className="h-5 w-5 mr-2" /> {t('buttonHistory')}
          </button>
        </Tooltip>
         <Tooltip text={t('tooltipGithub')}>
          <button
            onClick={onToggleGithubPanel}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-700 dark:hover:to-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
          >
            <GithubIcon className="h-5 w-5 mr-2" /> GitHub
          </button>
        </Tooltip>
        <div className="relative col-span-2 sm:col-span-1" ref={executeButtonRef}>
            <div className="flex w-full">
                <Tooltip text={t('tooltipExecute')}>
                    <button
                        onClick={() => { onExecute(false); setIsExecuteMenuOpen(false); }}
                        disabled={isLoading || !script}
                        className="flex-grow flex items-center justify-center px-4 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-purple-100 hover:bg-purple-200 text-purple-800 dark:text-white dark:bg-gradient-to-br dark:from-purple-600 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                    >
                        <ExecuteIcon className="h-5 w-5 mr-2" /> {t('buttonExecute')}
                    </button>
                </Tooltip>
                <button
                    onClick={() => setIsExecuteMenuOpen(!isExecuteMenuOpen)}
                    disabled={isLoading || !script}
                    className="px-2 bg-purple-100 hover:bg-purple-200 text-purple-800 dark:text-white dark:bg-gradient-to-br dark:from-pink-500 dark:to-pink-500 dark:hover:from-pink-500 dark:hover:to-pink-400 rounded-r-lg border-l border-purple-300 dark:border-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-haspopup="true"
                    aria-expanded={isExecuteMenuOpen}
                >
                    <ChevronDownIcon className="h-5 w-5" />
                </button>
            </div>
            {isExecuteMenuOpen && (
                <div className="absolute bottom-full mb-2 w-full bg-white dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-2xl border border-gray-200 dark:border-white/10 z-10">
                    <Tooltip text={t('tooltipExecuteSudo')}>
                        <button
                            onClick={() => { onExecute(true); setIsExecuteMenuOpen(false); }}
                            className="w-full flex items-center px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg"
                        >
                            <ShieldExclamationIcon className="h-5 w-5 mr-2 text-yellow-500 dark:text-yellow-400" />
                            {t('buttonRunWithSudo')}
                        </button>
                    </Tooltip>
                </div>
            )}
        </div>
        <Tooltip text={t('tooltipAddDocstrings')}>
          <button
            onClick={onAddDocstrings}
            disabled={isLoading || !script}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-100 hover:bg-blue-200 text-blue-800 dark:text-white dark:bg-gradient-to-br dark:from-blue-500 dark:to-sky-500 dark:hover:from-blue-500 dark:hover:to-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
          >
            <AddDocstringsIcon className="h-5 w-5 mr-2" /> {t('buttonAddDocstrings')}
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipOptimizePerformance')}>
          <button
            onClick={onOptimizePerformance}
            disabled={isLoading || !script}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-100 hover:bg-indigo-200 text-indigo-800 dark:text-white dark:bg-gradient-to-br dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-500 dark:hover:to-violet-500 focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:focus:ring-indigo-800"
          >
            <OptimizePerformanceIcon className="h-5 w-5 mr-2" /> {t('buttonOptimizePerformance')}
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipCheckSecurity')}>
          <button
            onClick={onCheckSecurity}
            disabled={isLoading || !script}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-red-100 hover:bg-red-200 text-red-800 dark:text-white dark:bg-gradient-to-br dark:from-red-500 dark:to-pink-500 dark:hover:from-red-500 dark:hover:to-pink-500 focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
          >
            <CheckSecurityIcon className="h-5 w-5 mr-2" /> {t('buttonCheckSecurity')}
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipAnalyze')}>
          <button
            onClick={onAnalyze}
            disabled={isLoading || !script}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-cyan-100 hover:bg-cyan-200 text-cyan-800 dark:text-white dark:bg-gradient-to-br dark:from-cyan-500 dark:to-blue-500 dark:hover:from-cyan-500 dark:hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <AnalyzeIcon className="h-5 w-5 mr-2" /> {t('buttonAnalyze')}
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipValidate')}>
          <button
            onClick={onValidate}
            disabled={isLoading || !script}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:text-white dark:bg-gradient-to-br dark:from-yellow-500 dark:to-orange-500 dark:hover:from-yellow-500 dark:hover:to-orange-500 focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:focus:ring-yellow-800"
          >
            <ValidateIcon className="h-5 w-5 mr-2" /> {t('buttonValidate')}
          </button>
        </Tooltip>
        <Tooltip text={t('tooltipImprove')}>
          <button
            onClick={onImprove}
            disabled={isLoading || !script}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-green-100 hover:bg-green-200 text-green-800 dark:text-white dark:bg-gradient-to-br dark:from-green-500 dark:to-teal-500 dark:hover:from-green-500 dark:hover:to-teal-500 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <ImproveIcon className="h-5 w-5 mr-2" /> {t('buttonImprove')}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ScriptEditor;