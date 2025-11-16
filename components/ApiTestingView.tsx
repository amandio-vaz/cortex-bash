import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useEditorTheme } from '../context/EditorThemeContext';
import { KNOWLEDGE_BASE_DATA } from '../data/knowledgeBase';
import { ClipboardIcon, CheckCircleIcon } from '../icons';
import Tooltip from './Tooltip';

const CopyButton: React.FC<{ code: string }> = ({ code }) => {
    const { t } = useLanguage();
    const [isCopied, setIsCopied] = useState(false);
  
    const handleCopy = () => {
      if (!code) return;
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };
  
    return (
      <Tooltip text={isCopied ? t('tooltipCopied') : t('tooltipCopy')}>
        <button
          onClick={handleCopy}
          className="bg-gray-300/50 hover:bg-gray-400/50 text-gray-700 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 dark:text-gray-300 p-2 rounded-md transition-all flex items-center"
        >
          {isCopied ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
          ) : (
            <ClipboardIcon className="h-5 w-5" />
          )}
        </button>
      </Tooltip>
    );
};

const CommandReference: React.FC = () => {
    const { t } = useLanguage();
    const apiCommands = KNOWLEDGE_BASE_DATA.api.commands.slice(0, 5); // Show first 5 for brevity
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
                {apiCommands.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-slate-800">
                        <td className="px-2 py-3 font-mono text-cyan-700 dark:text-cyan-400">
                            <code>{item.command}</code>
                        </td>
                        <td className="px-2 py-3 text-gray-700 dark:text-gray-300">{item.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const ApiTestingView: React.FC = () => {
    const { t } = useLanguage();
    const { theme } = useEditorTheme();
    
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://api.github.com/users/google');
    const [headers, setHeaders] = useState<{key: string, value: string}[]>([{ key: 'Content-Type', value: 'application/json' }]);
    const [body, setBody] = useState('{\n  "key": "value"\n}');
    const webhookPort = '8080';

    const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
        const newHeaders = [...headers];
        newHeaders[index][field] = value;
        setHeaders(newHeaders);
    };

    const addHeader = () => {
        setHeaders([...headers, { key: '', value: '' }]);
    };

    const generatedCommand = useMemo(() => {
        let command = `curl -X ${method} "${url}"`;
        headers.forEach(header => {
            if (header.key && header.value) {
                command += ` \\\n  -H "${header.key}: ${header.value}"`;
            }
        });
        if (['POST', 'PUT', 'PATCH'].includes(method) && body.trim()) {
            command += ` \\\n  -d '${body.replace(/'/g, "'\\''")}'`;
        }
        return command;
    }, [method, url, headers, body]);

    return (
        <div 
            className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl flex flex-col h-full p-4 shadow-lg dark:shadow-2xl dark:shadow-black/20 overflow-y-auto"
            style={{ backgroundColor: theme.colors.resultBg, color: theme.colors.resultText }}
        >
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-white/10 pb-2" style={{ color: theme.colors.resultTitle }}>
                {t('apiTestingTitle')}
            </h2>
            
            <div className="space-y-6">
                {/* API Request Builder */}
                <section>
                    <h3 className="text-lg font-medium text-purple-600 dark:text-purple-400">{t('apiRequestGeneratorTitle')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('apiRequestGeneratorDesc')}</p>
                    <div className="space-y-4 p-4 rounded-lg border border-gray-200 dark:border-slate-800" style={{ backgroundColor: theme.colors.editorBg }}>
                        <div className="flex space-x-2">
                            <select value={method} onChange={e => setMethod(e.target.value)} className="font-mono p-2 rounded-md border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500/50 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200">
                                <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option><option>HEAD</option>
                            </select>
                            <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder={t('apiUrlPlaceholder')} className="w-full font-mono p-2 rounded-md border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500/50 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200" />
                        </div>
                        <div>
                            {headers.map((header, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <input type="text" value={header.key} onChange={e => handleHeaderChange(index, 'key', e.target.value)} placeholder="Header" className="w-1/3 font-mono p-2 text-sm rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200" />
                                    <input type="text" value={header.value} onChange={e => handleHeaderChange(index, 'value', e.target.value)} placeholder="Value" className="w-2/3 font-mono p-2 text-sm rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200" />
                                </div>
                            ))}
                            <button onClick={addHeader} className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline">{t('apiAddHeader')}</button>
                        </div>
                        {['POST', 'PUT', 'PATCH'].includes(method) && (
                           <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.resultText }}>{t('apiRequestBody')}</label>
                                <textarea value={body} onChange={e => setBody(e.target.value)} rows={4} className="w-full font-mono p-2 rounded-md border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500/50 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200 resize-y"></textarea>
                           </div>
                        )}
                        <div>
                           <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.resultText }}>{t('apiGeneratedCommand')}</label>
                            <div className="relative">
                                <pre className="p-3 pr-12 bg-white dark:bg-slate-900 rounded-md text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto border border-gray-300 dark:border-slate-700"><code>{generatedCommand}</code></pre>
                                <div className="absolute top-2 right-2"><CopyButton code={generatedCommand} /></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Webhook Tools */}
                <section>
                    <h3 className="text-lg font-medium text-cyan-600 dark:text-cyan-400">{t('webhookToolsTitle')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('webhookToolsDesc')}</p>
                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold">{t('webhookListenerCmd')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('webhookListenerDesc', { port: webhookPort })}</p>
                            <div className="relative"><pre className="p-2 pr-12 bg-gray-100 dark:bg-slate-800 rounded-md font-mono text-sm"><code className="text-purple-600 dark:text-purple-400">{`while true; do { echo -e "HTTP/1.1 200 OK\\n"; cat -; } | nc -l ${webhookPort}; done`}</code></pre><div className="absolute top-1.5 right-1.5"><CopyButton code={`while true; do { echo -e "HTTP/1.1 200 OK\\n"; cat -; } | nc -l ${webhookPort}; done`} /></div></div>
                        </div>
                        <div>
                            <p className="font-semibold">{t('webhookNgronkCmd')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('webhookNgronkDesc')}</p>
                            <div className="relative"><pre className="p-2 pr-12 bg-gray-100 dark:bg-slate-800 rounded-md font-mono text-sm"><code className="text-purple-600 dark:text-purple-400">{`ngrok http ${webhookPort}`}</code></pre><div className="absolute top-1.5 right-1.5"><CopyButton code={`ngrok http ${webhookPort}`} /></div></div>
                        </div>
                    </div>
                </section>
                
                {/* Quick Command Reference */}
                <section>
                    <h3 className="text-lg font-medium text-green-600 dark:text-green-400">{t('quickRefTitle')}</h3>
                    <div className="mt-2 p-2 rounded-lg border border-gray-200 dark:border-slate-800" style={{ backgroundColor: theme.colors.editorBg }}>
                        <CommandReference />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ApiTestingView;