import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import ScriptEditor from './components/ScriptEditor';
import ResultDisplay from './components/ResultDisplay';
import Chatbot from './components/Chatbot';
import TabButton from './components/TabButton';
import GeneratorView from './components/GeneratorView';
import SettingsModal from './components/SettingsModal';
import { ActiveView, ValidationIssue } from './types';
import { analyzeScript, improveScript, generateScript, validateScript } from './services/geminiService';
import { useLanguage } from './context/LanguageContext';
import { useIconContext } from './context/IconContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const { getIconComponent } = useIconContext();

  const [script, setScript] = useState<string>(() => {
    const savedScript = localStorage.getItem('bashstudio-script');
    return savedScript || '#!/bin/bash\n\n# Bem-vindo ao BashStudio!\n# Escreva seu script aqui ou descreva um para ser gerado.\n\necho "Olá, Mundo!"';
  });
  const [generatorPrompt, setGeneratorPrompt] = useState<string>(() => {
    const savedPrompt = localStorage.getItem('bashstudio-generator-prompt');
    return savedPrompt || 'Crie um script que lista todos os arquivos no diretório atual e os ordena por tamanho.';
  });
  const [result, setResult] = useState<string>('');
  const [resultTitle, setResultTitle] = useState<string>(t('tabAssistant'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<ActiveView>(ActiveView.Assistant);
  const [showSaveNotification, setShowSaveNotification] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [fullscreenView, setFullscreenView] = useState<'editor' | 'result' | null>(null);

  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({});

  const scriptRef = useRef(script);
  useEffect(() => {
    scriptRef.current = script;
  }, [script]);

  const generatorPromptRef = useRef(generatorPrompt);
  useEffect(() => {
    generatorPromptRef.current = generatorPrompt;
  }, [generatorPrompt]);

  const handleToggleFullscreen = (view: 'editor' | 'result') => {
    setFullscreenView(prev => (prev === view ? null : view));
  };

  const handleScriptChange = (newScript: string) => {
    setScript(newScript);
    if (validationIssues.length > 0) {
      setValidationIssues([]);
    }
  };
  
  const handleSaveScript = () => {
    localStorage.setItem('bashstudio-script', script);
    setShowSaveNotification(true);
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 2000);
  };

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (scriptRef.current !== '#!/bin/bash\n\n# Bem-vindo ao BashStudio!\n# Escreva seu script aqui ou descreva um para ser gerado.\n\necho "Olá, Mundo!"' && scriptRef.current) {
        localStorage.setItem('bashstudio-script', scriptRef.current);
        setShowSaveNotification(true);
        setTimeout(() => {
          setShowSaveNotification(false);
        }, 2000);
      }
    }, 30000);

    return () => {
      clearInterval(autoSaveInterval);
    };
  }, []);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
        if (generatorPromptRef.current) {
            localStorage.setItem('bashstudio-generator-prompt', generatorPromptRef.current);
        }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, []);

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

  const handleApiCall = useCallback(async (
    apiFunc: (param: any) => Promise<string>, 
    param: any, 
    titleKey: string, 
    isGenerateOp: boolean = false,
    onSuccess?: (response: string) => void
  ) => {
    const title = t(titleKey);
    setValidationIssues([]);
    setIsLoading(true);
    if (isGenerateOp) {
      setIsThinking(true);
    }
    setResult('');
    setActiveView(ActiveView.Assistant);
    setResultTitle(t('thinkingTitle', { title }));
    try {
      const response = await apiFunc(param);
      
      if (onSuccess) {
        await onSuccess(response);
      } else {
        setResult(response);
        setResultTitle(title);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = t('errorGeneric');
      setResult(`Error: ${errorMessage}`);
      setResultTitle(t('errorTitle', { title }));
    } finally {
      setIsLoading(false);
      if (isGenerateOp) {
        setIsThinking(false);
      }
    }
  }, [t]);

  const handleAnalyze = () => {
    handleApiCall(analyzeScript, script, 'analysisTitle');
  };

  const handleImprove = () => {
    handleApiCall(improveScript, script, 'improvementTitle');
  };

  const handleAutoValidate = useCallback(async () => {
    const scriptToValidate = scriptRef.current;
    if (!scriptToValidate.trim()) {
      setValidationIssues([]);
      return;
    }

    try {
      const validationResult = await validateScript(scriptToValidate);
      // Previne condições de corrida: atualiza os problemas apenas se o script não mudou
      // desde que a validação foi iniciada.
      if (scriptRef.current === scriptToValidate) {
        setValidationIssues(validationResult.issues);
      }
    } catch (error) {
      console.error("Auto-validation error:", error);
    }
  }, []); // Dependência vazia é correta pois usa ref.


  const handleValidate = async () => {
    setIsLoading(true);
    setValidationIssues([]);
    setResult('');
    setActiveView(ActiveView.Assistant);
    const validationReportTitle = t('validationSucceededWithIssuesTitle');
    setResultTitle(t('thinkingTitle', { title: validationReportTitle }));

    try {
        const validationResult = await validateScript(script);
        setValidationIssues(validationResult.issues);
        let report = `## ${validationReportTitle}\n\n`;

        if (validationResult.issues.length === 0) {
            report += `**${t('validationPassedMessage')}**\n\n${t('validationPassedBody')}`;
        } else {
            const summary = validationResult.isValid 
                ? t('validationSucceededWithIssuesHeader') 
                : t('validationReportHeader');
            report += `${summary}\n\n`;

            validationResult.issues.forEach(issue => {
                const linePrefix = issue.line ? `${t('validationIssueLine', { line: issue.line.toString() })}: ` : '';
                report += `- **[${issue.severity.toUpperCase()}]** ${linePrefix}${issue.message}\n`;
            });
        }
        setResult(report);
        setResultTitle(validationReportTitle);

    } catch (error) {
        console.error(error);
        const errorMessage = t('errorGeneric');
        setResult(`Error: ${errorMessage}`);
        setResultTitle(t('errorTitle', { title: validationReportTitle }));
    } finally {
        setIsLoading(false);
    }
  };

  const handleGenerate = () => {
    const onSuccess = async (generationResponse: string) => {
        const match = generationResponse.match(/```bash([\s\S]*?)```/);
        if (match && match[1]) {
            const extractedScript = match[1].trim();
            const validationResult = await validateScript(extractedScript);

            let report = '';
            if (validationResult.issues.length > 0) {
                const reportTitleKey = validationResult.isValid ? 'validationSucceededWithIssuesTitle' : 'validationFailedTitle';
                const reportHeaderKey = validationResult.isValid ? 'validationSucceededWithIssuesHeader' : 'validationReportHeader';
                
                report += `## ${t(reportTitleKey)}\n\n${t(reportHeaderKey)}\n\n`;
                validationResult.issues.forEach(issue => {
                    const linePrefix = issue.line ? `${t('validationIssueLine', { line: issue.line.toString() })}: ` : '';
                    report += `- **[${issue.severity.toUpperCase()}]** ${linePrefix}${issue.message}\n`;
                });
                report += `\n\n---\n\n### ${t('originalGenerationTitle')}\n\n`;
            }

            if (validationResult.isValid) {
                setScript(extractedScript);
                const successMessage = validationResult.issues.length === 0 ? `**${t('validationPassedMessage')}**\n\n` : '';
                setResult(successMessage + report + generationResponse);
                setResultTitle(t('generationTitle'));
            } else {
                setValidationIssues(validationResult.issues);
                const fullResult = report + generationResponse;
                setResult(fullResult);
                setResultTitle(t('validationFailedTitle'));
            }
        } else {
            setResult(generationResponse);
            setResultTitle(t('generationTitle'));
        }
    };
    handleApiCall(generateScript, generatorPrompt, 'generationTitle', true, onSuccess);
  };
  
  const AssistantIcon = getIconComponent('assistantTab');
  const GeneratorIcon = getIconComponent('generatorTab');
  const ChatIcon = getIconComponent('chatTab');

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
            prompt={generatorPrompt}
            setPrompt={setGeneratorPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        );
      case ActiveView.Chat:
        return <Chatbot />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen text-white flex flex-col font-sans">
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
            onAnalyze={handleAnalyze}
            onImprove={handleImprove}
            onValidate={handleValidate}
            onAutoValidate={handleAutoValidate}
            isLoading={isLoading}
            showSaveNotification={showSaveNotification}
            issues={validationIssues}
            isFullscreen={fullscreenView === 'editor'}
            onToggleFullscreen={() => handleToggleFullscreen('editor')}
          />
        </div>
        <div className={`
          ${fullscreenView === 'editor' ? 'hidden' : 'flex'}
          ${fullscreenView === 'result' ? 'w-full' : 'lg:w-1/2'}
          flex-col min-h-[500px] lg:min-h-0 transition-all duration-300
        `}>
          <div ref={tabContainerRef} className="relative flex border-b border-white/10 mb-4">
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
             <div 
               className="absolute bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-in-out" 
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
    </div>
  );
};

export default App;