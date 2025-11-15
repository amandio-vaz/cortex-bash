import React, { useState, useEffect, useMemo } from 'react';
import { GithubUser, Gist } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getGists } from '../services/githubService';
import { GithubIcon } from '../icons';

interface GithubPanelProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  user: GithubUser | null;
  onTokenSubmit: (token: string) => Promise<boolean>;
  onLogout: () => void;
  onLoadGist: (gist: Gist) => void;
  onSaveGist: (description: string, isPublic: boolean) => void;
  onUpdateGist: () => void;
  currentScript: string;
  currentGistId: string | null;
}

const SaveGistModal: React.FC<{
    onClose: () => void;
    onSave: (description: string, isPublic: boolean) => void;
    isSaving: boolean;
}> = ({ onClose, onSave, isSaving }) => {
    const { t } = useLanguage();
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const handleSave = () => {
        if (description.trim()) {
            onSave(description, isPublic);
        }
    };

    return (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-sm border border-gray-200 dark:border-white/10 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{t('githubSaveNewGist')}</h3>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('githubGistDescription')}
                    className="w-full bg-gray-100 dark:bg-slate-900/50 p-2 rounded-md border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500/50"
                />
                <div className="flex items-center my-4">
                    <input type="checkbox" id="gist-public" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                    <label htmlFor="gist-public" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">{t('githubGistPublic')}</label>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600">{t('githubGistCancelButton')}</button>
                    <button onClick={handleSave} disabled={!description.trim() || isSaving} className="px-4 py-2 text-sm rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400">
                        {isSaving ? t('githubGistSavingButton') : t('githubGistSaveButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const GithubPanel: React.FC<GithubPanelProps> = ({ isOpen, onClose, token, user, onTokenSubmit, onLogout, onLoadGist, onSaveGist, onUpdateGist, currentScript, currentGistId }) => {
  const { t } = useLanguage();
  const [pat, setPat] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [gists, setGists] = useState<Gist[]>([]);
  const [isGistLoading, setIsGistLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  useEffect(() => {
    if (user && token) {
      setIsGistLoading(true);
      getGists(token)
        .then(allGists => {
          const bashGists = allGists.filter(gist => 
            Object.values(gist.files).some(file => file.language === 'Shell' || file.filename.endsWith('.sh'))
          );
          setGists(bashGists);
        })
        .catch(err => console.error("Failed to fetch gists", err))
        .finally(() => setIsGistLoading(false));
    }
  }, [user, token]);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);
    const success = await onTokenSubmit(pat);
    if (!success) {
      setError(t('githubInvalidToken'));
    }
    setPat('');
    setIsLoading(false);
  };

  const filteredGists = useMemo(() => {
    return gists.filter(gist => 
      (gist.description || Object.keys(gist.files)[0] || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [gists, searchTerm]);

  if (!isOpen) return null;
  
  const handleSave = (description: string, isPublic: boolean) => {
    onSaveGist(description, isPublic);
    setIsSaveModalOpen(false);
  }

  const formatUpdateDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
  }

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900/70 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl shadow-black/40 relative" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-gray-300 dark:border-white/10 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <GithubIcon className="h-6 w-6 mr-2" />
            {t('githubTitle')}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        {!user ? (
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{t('githubConnectTitle')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">{t('githubConnectDescription')}</p>
            <a href="https://github.com/settings/tokens/new?scopes=gist" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline">{t('githubConnectLink')}</a>
            <input
              type="password"
              value={pat}
              onChange={(e) => setPat(e.target.value)}
              placeholder={t('githubTokenPlaceholder')}
              className="mt-4 w-full max-w-sm mx-auto bg-gray-100 dark:bg-slate-900/50 p-2 rounded-md border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500/50"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button onClick={handleConnect} disabled={isLoading || !pat} className="mt-4 px-6 py-2 rounded-lg text-white bg-gradient-to-br from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500">
              {isLoading ? t('githubConnectingButton') : t('githubConnectButton')}
            </button>
          </div>
        ) : (
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className="p-4 border-b border-gray-300 dark:border-white/10 flex justify-between items-center">
              <div className="flex items-center">
                <img src={user.avatar_url} alt={user.login} className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('githubConnectedAs')}</p>
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 dark:text-white hover:underline">{user.login}</a>
                </div>
              </div>
              <button onClick={onLogout} className="text-sm px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600">{t('githubLogout')}</button>
            </div>
            <div className="p-4 flex-shrink-0">
                <div className="flex gap-2">
                    <button onClick={() => setIsSaveModalOpen(true)} disabled={!currentScript} className="flex-1 px-4 py-2 text-sm rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400">{t('githubSaveNewGist')}</button>
                    <button onClick={onUpdateGist} disabled={!currentGistId} className="flex-1 px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">{t('githubUpdateGist')}</button>
                </div>
                <input
                    type="text"
                    placeholder={t('githubGistSearchPlaceholder')}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="mt-4 w-full bg-gray-100 dark:bg-slate-900/50 p-2 rounded-md border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500/50"
                />
            </div>
            <div className="px-6 pb-6 flex-grow overflow-y-auto">
              {isGistLoading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading Gists...</p>
              ) : filteredGists.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">{t('githubNoGists')}</p>
              ) : (
                <ul className="space-y-3">
                  {filteredGists.map(gist => (
                    <li key={gist.id} className="bg-gray-50 dark:bg-slate-800/50 p-3 rounded-lg border border-gray-200 dark:border-white/10 flex justify-between items-center">
                      <div>
                        <a href={gist.html_url} target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-700 dark:text-cyan-400 hover:underline">{gist.description || Object.keys(gist.files)[0]}</a>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('githubGistLastUpdated')}: {formatUpdateDate(gist.updated_at)}</p>
                      </div>
                      <button onClick={() => onLoadGist(gist)} className="px-3 py-1 text-xs font-semibold rounded-md bg-cyan-100 hover:bg-cyan-200 text-cyan-800 dark:text-white dark:bg-gradient-to-br dark:from-cyan-500 dark:to-blue-500">{t('githubLoadGist')}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        {isSaveModalOpen && <SaveGistModal onClose={() => setIsSaveModalOpen(false)} onSave={handleSave} isSaving={isLoading} />}
      </div>
    </div>
  );
};

export default GithubPanel;