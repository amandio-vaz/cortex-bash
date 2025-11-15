import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SCRIPT_TEMPLATES } from '../templates';
import { ScriptTemplate, TemplateCategory } from '../types';
import { FolderIcon, ServerIcon, GlobeAltIcon, CogIcon } from '../icons';

interface TemplateSelectorProps {
  onSelectTemplate: (prompt: string) => void;
}

const categoryIcons: Record<TemplateCategory, React.FC<{ className?: string }>> = {
  file: FolderIcon,
  system: ServerIcon,
  network: GlobeAltIcon,
  utility: CogIcon,
};

const TemplateCard: React.FC<{ template: ScriptTemplate; onSelect: () => void }> = ({ template, onSelect }) => {
  const { t } = useLanguage();
  const Icon = categoryIcons[template.category];

  return (
    <div className="flex-shrink-0 w-64 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-purple-500/10">
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
        className="mt-4 w-full text-sm text-center bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        {t('templateUseButton')}
      </button>
    </div>
  );
};

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">{t('templatesTitle')}</h3>
      <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
        {SCRIPT_TEMPLATES.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => onSelectTemplate(template.prompt)}
          />
        ))}
         <div className="flex-shrink-0 w-2"></div>
      </div>
    </div>
  );
};

export default TemplateSelector;