import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import ScriptEditor from './components/ScriptEditor';
import ResultDisplay from './components/ResultDisplay';
import Chatbot from './components/Chatbot';
import TabButton from './components/TabButton';
import GeneratorView from './components/GeneratorView';
import SettingsModal from './components/SettingsModal';
import HistoryPanel from './components/HistoryPanel';
import GithubPanel from './components/GithubPanel';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import { ActiveView, ValidationIssue, ScriptHistoryEntry, GithubUser, Gist } from './types';
import { analyzeScript, improveScript, generateScript, validateScript, executeScript, addDocstrings, optimizePerformance, checkSecurity } from './services/geminiService';
import { getUser, getGistContent, createGist, updateGist } from './services/githubService';
import { useLanguage } from './context/LanguageContext';
import { useIconContext } from './context/IconContext';

const MAX_HISTORY_ENTRIES = 20;
const INITIAL_SCRIPT = '#!/bin/bash\n\n# Bem-vindo ao BashStudio!\n# Escreva seu script aqui ou descreva um para ser gerado.\n\necho "Olá, Mundo!"';

// --- Undo/Redo Hook ---
type UndoRedoState<T> = {
  past: T[];
  present: T;
  future: T[];
};

// FIX: Updated hook to support lazy initialization for the initial state.
// This allows passing a function to compute the initial value, which is useful
// for expensive operations like reading from localStorage, ensuring it only runs once.
const useUndoRedo = <T,>(initialPresent: T | (() => T)) => {
  const [state, setState] = useState<UndoRedoState<T>>(() => {
    const present =
      typeof initialPresent === 'function'
        ? (initialPresent as () => T)()
        : initialPresent;
    return {
      past: [],
      present,
      future: [],
    };
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);
    setState({
      past: newPast,
      present: previous,
      future: [state.present, ...state.future],
    });
  }, [canUndo, state]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    setState({
      past: [...state.past, state.present],
      present: next,
      future: newFuture,
    });
  }, [canRedo, state]);

  const set = useCallback((newPresent: T) => {
    if (newPresent === state.present) return;
    setState({
      past: [...state.past, state.present],
      present: newPresent,
      future: [],
    });
  }, [state.present, state.past]);
  
  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return [state.present, { set, undo, redo, reset, canUndo, canRedo }] as const;
};


const App: React.FC = () => {
  const { t } = useLanguage();
  const { getIconComponent } = useIconContext();

  const [script, { set: setScript, undo, redo, reset: resetScript, canUndo, canRedo }] = useUndoRedo<string>(() => {
    const savedScript = localStorage.getItem('bashstudio-script');
    return savedScript || INITIAL_SCRIPT;
  });

  const [result, setResult] = useState<string>('');
  const [resultTitle, setResultTitle] = useState<string>(t('tabAssistant'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<ActiveView>(ActiveView.Assistant);
  const [showSaveNotification, setShowSaveNotification] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState<boolean>(false);
  const [isGithubPanelOpen, setIsGithubPanelOpen] = useState<boolean>(false);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [fullscreenView, setFullscreenView] = useState<'editor' | 'result' | null>(null);
  const [scriptHistory, setScriptHistory] = useState<ScriptHistoryEntry[]>([]);

  // GitHub State
  const [githubToken, setGithubToken] = useState<string | null>(null);
  const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
  const [currentGistId, setCurrentGistId] = useState<string | null>(null);

  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({});

  const scriptRef = useRef(script);
  useEffect(() => {
    scriptRef.current = script;
  }, [script]);

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('bashstudio-script-history');
      if (savedHistory) setScriptHistory(JSON.parse(savedHistory));

      const savedToken = localStorage.getItem('bashstudio-github-token');
      if (savedToken) handleTokenSubmit(savedToken);

    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    }
  }, []);

  const handleToggleFullscreen = (view: 'editor' | 'result') => {
    setFullscreenView(prev => (prev === view ? null : view));
  };

  const handleScriptChange = (newScript: string) => {
    setScript(newScript);
    if (validationIssues.length > 0) {
      setValidationIssues([]);
    }
  };
  
  const handleSaveScript = useCallback(() => {
    localStorage.setItem('bashstudio-script', script);
    setShowSaveNotification(true);
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 2000);
    
    // Update history
    setScriptHistory(prevHistory => {
        if (prevHistory.length > 0 && prevHistory[0].content === script) {
            return prevHistory;
        }
        const newEntry: ScriptHistoryEntry = { timestamp: Date.now(), content: script };
        const updatedHistory = [newEntry, ...prevHistory].slice(0, MAX_HISTORY_ENTRIES);
        localStorage.setItem('bashstudio-script-history', JSON.stringify(updatedHistory));
        return updatedHistory;
    });

  }, [script]);

  // Keyboard shortcuts for save, undo, redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.userAgent.includes('Mac');
      const modKey = isMac ? event.metaKey : event.ctrlKey;

      if (modKey && event.key === 's') {
        event.preventDefault();
        handleSaveScript();
      } else if (modKey && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (!isMac && event.ctrlKey && event.key.toLowerCase() === 'y') {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSaveScript, undo, redo]);

  const handleRestoreScript = (content: string) => {
    resetScript(content);
    setCurrentGistId(null);
    setIsHistoryPanelOpen(false);
  };
  
  // Debounced auto-save mechanism
  useEffect(() => {
    const autoSaveTimeout = setTimeout(() => {
      if (script && script !== INITIAL_SCRIPT) {
        handleSaveScript();
      }
    }, 2000); // Auto-saves 2 seconds after the user stops typing

    return () => clearTimeout(autoSaveTimeout);
  }, [script, handleSaveScript]);


  useEffect(() => {
    if (tabContainerRef.current) {
      const activeTabElement = tabContainerRef.current.querySelector(`[data-view='${activeView}']`) as HTMLElement;
      if (activeTabElement) {
        setSliderStyle({
          left: `${activeTabElement.offsetLeft}px`,
          width: `${activeTabElement.offsetWidth}px`,
        });
      }
    }
  }, [activeView]);

  // --- GitHub Handlers ---
  const handleTokenSubmit = async (token: string) => {
    try {
      const user = await getUser(token);
      setGithubUser(user);
      setGithubToken(token);
      localStorage.setItem('bashstudio-github-token', token);
      return true;
    } catch (error) {
      console.error("GitHub token validation failed:", error);
      setGithubUser(null);
      setGithubToken(null);
      localStorage.removeItem('bashstudio-github-token');
      return false;
    }
  };

  const handleGithubLogout = () => {
    setGithubUser(null);
    setGithubToken(null);
    localStorage.removeItem('bashstudio-github-token');
  };

  const handleLoadGist = async (gist: Gist) => {
    if (!githubToken) return;
    const bashFile = Object.values(gist.files).find(f => f.filename.endsWith('.sh') || f.language === 'Shell');
    if (bashFile) {
        try {
            const content = await getGistContent(bashFile.raw_url, githubToken);
            resetScript(content);
            setCurrentGistId(gist.id);
            setIsGithubPanelOpen(false);
        } catch (error) {
            console.error("Failed to load Gist content:", error);
        }
    }
  };

  const handleSaveToGist = async (description: string, isPublic: boolean) => {
    if (!githubToken || !script) return;
    const filename = description.toLowerCase().replace(/\s+/g, '-') + '.sh';
    try {
      const newGist = await createGist(description, filename, script, isPublic, githubToken);
      setCurrentGistId(newGist.id);
      // Optional: show a success message
    } catch(error) {
      console.error("Failed to create Gist:", error);
    }
  };

  const handleUpdateGist = async () => {
    if (!githubToken || !script || !currentGistId) return;
    try {
        await updateGist(currentGistId, script, githubToken);
        // Optional: show a success message
    } catch (error) {
        console.error("Failed to update Gist:", error);
    }
  };

  // --- API Call Handler ---
  const handleApiCall = useCallback(async (
    apiFunc: (param: any) => Promise<any>, 
    param: any, 
    titleKey: string, 
    isGenerateOp: boolean = false,
    onSuccess?: (response: any) => void
  ) => {
    const title = t(titleKey);
    setValidationIssues([]);
    setIsLoading(true);
    if (isGenerateOp) setIsThinking(true);
    setResult('');
    setActiveView(ActiveView.Assistant);
    setResultTitle(t('thinkingTitle', { title }));
    try {
      const response = await apiFunc(param);
      if (onSuccess) {
        onSuccess(response);
      } else {
        setResult(response);
      }
      setResultTitle(title);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : t('errorGeneric');
      const detailedMessage = `${t('errorApiCall')}\n\n**${t('errorDetails')}:**\n\`\`\`\n${errorMessage}\n\`\`\``;
      setResult(detailedMessage);
      setResultTitle(t('errorTitle', { title }));
    } finally {
      setIsLoading(false);
      if (isGenerateOp) setIsThinking(false);
    }
  }, [t]);

  const handleAnalyze = () => handleApiCall(analyzeScript, script, 'analysisTitle');
  const handleImprove = () => handleApiCall(improveScript, script, 'improvementTitle');
  
  const handleExecute = (withSudo: boolean = false) => {
    const escapedScript = script.replace(/'/g, "'\\''");
    const scriptToExecute = withSudo ? `sudo bash -c '${escapedScript}'` : script;
    handleApiCall(executeScript, scriptToExecute, 'executionTitle', false, (response: string) => {
      setResult(response);
      setResultTitle(t('executionTitle'));
      const lines = response.replace(/```text\n?/, '').replace(/```\n?$/, '').split('\n');
      const newIssues: ValidationIssue[] = [];
      lines.forEach(line => {
        const match = line.match(/^L(\d+):\s*(.*)/);
        if (match) {
          newIssues.push({ line: parseInt(match[1], 10), message: `Execution Error: ${match[2]}`, severity: 'error' });
        }
      });
      if (newIssues.length > 0) setValidationIssues(newIssues);
    });
  };

  const handleAutoValidate = useCallback(async () => {
    const scriptToValidate = scriptRef.current;
    if (!scriptToValidate.trim()) {
      setValidationIssues([]);
      return;
    }
    try {
      const validationResult = await validateScript(scriptToValidate);
      if (scriptRef.current === scriptToValidate) setValidationIssues(validationResult.issues);
    } catch (error) {
      console.error("Auto-validation error:", error);
    }
  }, []);

  const handleValidate = async () => {
    setIsLoading(true);
    setValidationIssues([]);
    setResult('');
    setActiveView(ActiveView.Assistant);
    const titleKey = 'validationSucceededWithIssuesTitle';
    setResultTitle(t('thinkingTitle', { title: t(titleKey) }));
    try {
      const res = await validateScript(script);
      setValidationIssues(res.issues);
      let report = `## ${t(titleKey)}\n\n`;
      if (res.issues.length === 0) {
        report += `**${t('validationPassedMessage')}**\n\n${t('validationPassedBody')}`;
      } else {
        const summary = res.isValid ? t('validationSucceededWithIssuesHeader') : t('validationReportHeader');
        report += `${summary}\n\n`;
        res.issues.forEach(issue => {
          const linePrefix = issue.line ? `${t('validationIssueLine', { line: issue.line.toString() })}: ` : '';
          report += `- **[${issue.severity.toUpperCase()}]** ${linePrefix}${issue.message}\n`;
        });
      }
      setResult(report);
      setResultTitle(t(titleKey));
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : t('errorGeneric');
      setResult(`Error: ${errorMessage}`);
      setResultTitle(t('errorTitle', { title: t(titleKey) }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = (promptToGenerate: string) => {
    const onSuccess = async (genResponse: string) => {
      const match = genResponse.match(/```bash([\s\S]*?)```/);
      if (match?.[1]) {
        const extractedScript = match[1].trim();
        const validation = await validateScript(extractedScript);
        let report = '';
        if (validation.issues.length > 0) {
          const rTitleKey = validation.isValid ? 'validationSucceededWithIssuesTitle' : 'validationFailedTitle';
          const rHeaderKey = validation.isValid ? 'validationSucceededWithIssuesHeader' : 'validationReportHeader';
          report += `## ${t(rTitleKey)}\n\n${t(rHeaderKey)}\n\n`;
          validation.issues.forEach(issue => {
            const linePrefix = issue.line ? `${t('validationIssueLine', { line: issue.line.toString() })}: ` : '';
            report += `- **[${issue.severity.toUpperCase()}]** ${linePrefix}${issue.message}\n`;
          });
          report += `\n\n---\n\n### ${t('originalGenerationTitle')}\n\n`;
        }
        if (validation.isValid) {
          resetScript(extractedScript);
          setCurrentGistId(null);
          const successMsg = validation.issues.length === 0 ? `**${t('validationPassedMessage')}**\n\n` : '';
          setResult(successMsg + report + genResponse);
          setResultTitle(t('generationTitle'));
        } else {
          setValidationIssues(validation.issues);
          setResult(report + genResponse);
          setResultTitle(t('validationFailedTitle'));
        }
      } else {
        setResult(genResponse);
        setResultTitle(t('generationTitle'));
      }
    };
    handleApiCall(generateScript, promptToGenerate, 'generationTitle', true, onSuccess);
  };

  const handleAddDocstrings = () => handleApiCall(addDocstrings, script, 'docstringsTitle', false, (response: string) => {
      resetScript(response);
      setCurrentGistId(null);
      const resultMessage = `**${t('docstringsTitle')}**\n\n${t('docstringsSuccessMessage')}\n\n\`\`\`bash\n${response}\n\`\`\``;
      setResult(resultMessage);
      setResultTitle(t('docstringsTitle'));
  });
  const handleOptimizePerformance = () => handleApiCall(optimizePerformance, script, 'optimizationTitle');
  const handleCheckSecurity = () => handleApiCall(checkSecurity, script, 'securityTitle');
  
  const AssistantIcon = getIconComponent('assistantTab');
  const GeneratorIcon = getIconComponent('generatorTab');
  const ChatIcon = getIconComponent('chatTab');
  const KnowledgeBaseIcon = getIconComponent('knowledgeBaseTab');

  const renderActiveView = () => {
    switch(activeView) {
      case ActiveView.Assistant:
        return (
          <ResultDisplay
            title={resultTitle}
            content={result}
            isLoading={isLoading}
            isThinking={isThinking}
            isFullscreen={fullscreenView === 'result'}
            onToggleFullscreen={() => handleToggleFullscreen('result')}
          />
        );
      case ActiveView.Generator:
        return (
          <GeneratorView
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        );
      case ActiveView.Chat:
        return <Chatbot />;
      case ActiveView.KnowledgeBase:
        return <KnowledgeBaseView />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen text-gray-800 dark:text-white flex flex-col font-sans">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      <main className="flex-grow p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        <div className={`
          ${fullscreenView === 'result' ? 'hidden' : 'flex'}
          ${fullscreenView === 'editor' ? 'w-full' : 'lg:w-1/2'}
           flex-col transition-all duration-300
        `}>
          <ScriptEditor
            script={script}
            setScript={handleScriptChange}
            onSave={handleSaveScript}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            onAnalyze={handleAnalyze}
            onImprove={handleImprove}
            onValidate={handleValidate}
            onExecute={handleExecute}
            onAutoValidate={handleAutoValidate}
            onToggleHistoryPanel={() => setIsHistoryPanelOpen(true)}
            onToggleGithubPanel={() => setIsGithubPanelOpen(true)}
            isLoading={isLoading}
            showSaveNotification={showSaveNotification}
            issues={validationIssues}
            isFullscreen={fullscreenView === 'editor'}
            onToggleFullscreen={() => handleToggleFullscreen('editor')}
            onAddDocstrings={handleAddDocstrings}
            onOptimizePerformance={handleOptimizePerformance}
            onCheckSecurity={handleCheckSecurity}
          />
        </div>
        <div className={`
          ${fullscreenView === 'editor' ? 'hidden' : 'flex'}
          ${fullscreenView === 'result' ? 'w-full' : 'lg:w-1/2'}
          flex-col min-h-[500px] lg:min-h-0 transition-all duration-300
        `}>
          <div ref={tabContainerRef} className="relative flex border-b border-gray-300 dark:border-white/10 mb-4">
             <TabButton 
                label={t('tabAssistant')}
                icon={<AssistantIcon className="h-5 w-5 mr-2" />}
                isActive={activeView === ActiveView.Assistant}
                onClick={() => setActiveView(ActiveView.Assistant)}
                tooltipText={t('tooltipAssistantTab')}
                view={ActiveView.Assistant}
             />
             <TabButton 
                label={t('tabGenerator')}
                icon={<GeneratorIcon className="h-5 w-5 mr-2" />}
                isActive={activeView === ActiveView.Generator}
                onClick={() => setActiveView(ActiveView.Generator)}
                tooltipText={t('tooltipGeneratorTab')}
                view={ActiveView.Generator}
             />
             <TabButton 
                label={t('tabChatbot')}
                icon={<ChatIcon className="h-5 w-5 mr-2" />}
                isActive={activeView === ActiveView.Chat}
                onClick={() => setActiveView(ActiveView.Chat)}
                tooltipText={t('tooltipChatbotTab')}
                view={ActiveView.Chat}
             />
             <TabButton
                label={t('tabKnowledgeBase')}
                icon={<KnowledgeBaseIcon className="h-5 w-5 mr-2" />}
                isActive={activeView === ActiveView.KnowledgeBase}
                onClick={() => setActiveView(ActiveView.KnowledgeBase)}
                tooltipText={t('tooltipKnowledgeBaseTab')}
                view={ActiveView.KnowledgeBase}
             />
             <div 
               className="absolute bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500 transition-all duration-300 ease-in-out" 
               style={sliderStyle}
              />
          </div>
          <div className="flex-grow transition-opacity duration-300" key={activeView}>
             {renderActiveView()}
          </div>
        </div>
      </main>
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <HistoryPanel
        isOpen={isHistoryPanelOpen}
        onClose={() => setIsHistoryPanelOpen(false)}
        history={scriptHistory}
        onRestore={handleRestoreScript}
      />
      <GithubPanel
        isOpen={isGithubPanelOpen}
        onClose={() => setIsGithubPanelOpen(false)}
        token={githubToken}
        user={githubUser}
        onTokenSubmit={handleTokenSubmit}
        onLogout={handleGithubLogout}
        onLoadGist={handleLoadGist}
        onSaveGist={handleSaveToGist}
        onUpdateGist={handleUpdateGist}
        currentScript={script}
        currentGistId={currentGistId}
      />
      <footer className="py-3 px-6 text-xs text-gray-500 dark:text-gray-500 flex justify-between items-center border-t border-gray-200 dark:border-white/10">
        <span>Desenvolvido com ❤️ por Amândio Vaz - 2025</span>
        <div className="bg-gray-100 dark:bg-slate-800/60 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full font-mono tracking-wider">
          Release: v1.0
        </div>
      </footer>
    </div>
  );
};

export default App;