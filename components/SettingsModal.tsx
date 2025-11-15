
import React from 'react';
import { useIconContext } from '../context/IconContext';
import { ICON_LIBRARY } from '../icons';
import { CustomizableAction } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const actionLabels: Record<CustomizableAction, string> = {
    analyze: 'Analyze Button',
    improve: 'Improve Button',
    validate: 'Validate Button',
    assistantTab: 'Assistant Tab',
    generatorTab: 'Generator Tab',
    chatTab: 'Chat Tab',
    generateAction: 'Generate Button',
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { iconSettings, setIcon, getIconComponent } = useIconContext();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl shadow-black/40"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Customize Interface</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6 overflow-y-auto space-y-6">
          {Object.entries(ICON_LIBRARY)
            .filter(([action]) => action !== 'settings')
            .map(([action, icons]) => {
            const currentIconName = iconSettings[action as CustomizableAction];
            const CurrentIcon = getIconComponent(action as CustomizableAction);

            return (
              <div key={action}>
                <h3 className="text-lg font-medium text-cyan-400 mb-3 flex items-center">
                  <CurrentIcon className="h-5 w-5 mr-2" />
                  {actionLabels[action as CustomizableAction] || action}
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                  {Object.entries(icons).map(([iconName, IconComponent]) => {
                    const isSelected = currentIconName === iconName;
                    return (
                      <button
                        key={iconName}
                        onClick={() => setIcon(action as CustomizableAction, iconName)}
                        className={`p-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          isSelected 
                            ? 'bg-cyan-500/20 ring-2 ring-cyan-400 text-white' 
                            : 'bg-slate-800/60 hover:bg-slate-700/60 text-gray-300'
                        }`}
                        title={iconName}
                      >
                        <IconComponent className="h-7 w-7" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
