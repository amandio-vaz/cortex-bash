import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SCRIPT_TEMPLATES } from '../templates';
import { ScriptTemplate, TemplateCategory } from '../types';
import { FolderIcon, ServerIcon, GlobeAltIcon, CogIcon, Squares2x2Icon } from '../icons';

interface TemplateSelectorProps {
  onSelectTemplate: (prompt: string) => void;
}

const categoryInfo: Record<TemplateCategory | 'all', { icon: React.FC<{ className?: string }>, nameKey: string }> = {
  all: { icon: Squares2x2Icon, nameKey: 'template_category_all' },
  file: { icon: FolderIcon, nameKey: 'template_category_file' },
  system: { icon: ServerIcon, nameKey: 'template_category_system' },
  network: { icon: GlobeAltIcon, nameKey: 'template_category_network' },
  utility: { icon: CogIcon, nameKey: 'template_category_utility' },
};

const TemplateCard: React.FC<{ template: ScriptTemplate; onSelect: () => void }> = ({ template, onSelect }) => {
  const { t } = useLanguage();
  const Icon = categoryInfo[template.category].icon;

  return (
    <div className="flex-shrink-0 w-64 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-purple-500/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/30">
      <div>
        <div className="flex items-center mb-2">
          <Icon className="h-6 w-6 mr-3 text-cyan-600 dark:text-cyan-400" />
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t(template.nameKey)}</h4>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
          {t(template.descriptionKey)}
        </p>
      </div>
      <button
        onClick={onSelect}
        className="mt-4 w-full text-sm text-center bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 dark:text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 active:scale-95"
      >
        {t('templateUseButton')}
      </button>
    </div>
  );
};

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') {
      return SCRIPT_TEMPLATES;
    }
    return SCRIPT_TEMPLATES.filter(template => template.category === activeCategory);
  }, [activeCategory]);
  
  const categories = Object.keys(categoryInfo) as (TemplateCategory | 'all')[];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">{t('templatesTitle')}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => {
          const { icon: Icon, nameKey } = categoryInfo[category];
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                isActive
                  ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-slate-800/50 dark:hover:bg-slate-700/60 dark:text-gray-300'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {t(nameKey)}
            </button>
          );
        })}
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={() => onSelectTemplate(template.prompt)}
            />
          ))
        ) : (
          <div className="text-center w-full py-8 text-gray-500 dark:text-gray-400">
            {t('template_noTemplatesFound')}
          </div>
        )}
        <div className="flex-shrink-0 w-2"></div>
      </div>
    </div>
  );
};

export default TemplateSelector;