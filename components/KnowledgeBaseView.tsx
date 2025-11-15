import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { KNOWLEDGE_BASE_DATA } from '../data/knowledgeBase';

const KnowledgeBaseView: React.FC = () => {
  const { t } = useLanguage();
  const categories = Object.keys(KNOWLEDGE_BASE_DATA);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommands = useMemo(() => {
    if (!activeCategory) return [];
    const lowercasedFilter = searchTerm.toLowerCase();
    return KNOWLEDGE_BASE_DATA[activeCategory].commands.filter(cmd =>
      cmd.command.toLowerCase().includes(lowercasedFilter) ||
      cmd.description.toLowerCase().includes(lowercasedFilter) ||
      cmd.example.toLowerCase().includes(lowercasedFilter)
    );
  }, [activeCategory, searchTerm]);

  return (
    <div className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl flex flex-col h-full p-4 shadow-lg dark:shadow-2xl dark:shadow-black/20">
      <div className="flex justify-between items-center mb-4 border-b border-gray-300 dark:border-white/10 pb-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">{t('knowledgeBaseTitle')}</h2>
      </div>
      
      {/* Category Sub-tabs */}
      <div className="flex border-b border-gray-300 dark:border-white/10 mb-4">
        {categories.map(categoryKey => (
          <button
            key={categoryKey}
            onClick={() => { setActiveCategory(categoryKey); setSearchTerm(''); }}
            className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeCategory === categoryKey
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {KNOWLEDGE_BASE_DATA[categoryKey].displayName}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={t('knowledgeBaseSearchPlaceholder')}
          className="w-full bg-gray-100/50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-200 p-2 pl-4 rounded-full border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
        />
      </div>

      {/* Commands Table */}
      <div className="flex-grow overflow-y-auto pr-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 dark:bg-slate-800/60 dark:text-gray-300 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/4">{t('knowledgeBaseHeaderCommand')}</th>
              <th scope="col" className="px-6 py-3 w-1/2">{t('knowledgeBaseHeaderDescription')}</th>
              <th scope="col" className="px-6 py-3 w-1/4">{t('knowledgeBaseHeaderExample')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommands.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-slate-800 hover:bg-gray-100/50 dark:hover:bg-slate-800/40 transition-colors duration-150">
                <td className="px-6 py-4 font-mono text-cyan-700 dark:text-cyan-400">
                  <code>{item.command}</code>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{item.description}</td>
                <td className="px-6 py-4 font-mono text-purple-600 dark:text-purple-400">
                  <code>{item.example}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCommands.length === 0 && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                Nenhum comando encontrado para "{searchTerm}".
            </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseView;