import React from 'react';
import { CustomizableAction } from './types';

interface IconProps {
  className?: string;
}

// --- Icon Components ---

export const ArrowsPointingOutIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25-11.25v4.5m0-4.5h-4.5m4.5 0L15 9" />
    </svg>
);

export const ArrowsPointingInIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9V4.5M15 9h4.5M15 9l5.25-5.25M15 15v4.5M15 15h4.5M15 15l5.25 5.25" />
    </svg>
);

export const SaveIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v2.586l1.293-1.293a1 1 0 111.414 1.414L12.414 8l1.293 1.293a1 1 0 11-1.414 1.414L11 9.414V12a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414L7.586 8 6.293 6.707a1 1 0 011.414-1.414L9 6.586V4a1 1 0 011-1zM3 10a1 1 0 011-1h2.586l-1.293-1.293a1 1 0 111.414-1.414L8 7.586l1.293-1.293a1 1 0 111.414 1.414L9.414 9H12a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414L8 12.414l-1.293 1.293a1 1 0 01-1.414-1.414L6.586 11H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

const MagnifyingGlassIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.293 4.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 011.414 0z" />
  </svg>
);

const MagicWandIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278C12 6.25278 14.8987 3.35406 17.5583 6.01369C20.218 8.67332 17.3193 11.572 17.3193 11.572M12 6.25278L17.3193 11.572M12 6.25278L6.68068 11.572M17.3193 11.572L6.68068 1.00002" transform="matrix(1 0 0 -1 0 23.144)" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21L12 12" />
  </svg>
);

const ShieldCheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.607 11.955 11.955 0 019 2.607c-.16.05-.323.094-.49.138z" />
  </svg>
);

const DocumentCheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12l-2 2-2-2" />
  </svg>
);

const ChatIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 00-1-1H5a1 1 0 00-1 1v5a1 1 0 001 1h10a1 1 0 001-1V6zM4 16a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1z" />
  </svg>
);

const HeadsetIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v4a2 2 0 01-2 2h-2v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4a1 1 0 011-1h2V8zM9 8h2a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2v4a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 00-1-1H9V8z" />
  </svg>
);

const LightningBoltIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

const FileCodeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const RobotIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V4a2 2 0 012-2h2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-2 4M17 16l2 4" />
  </svg>
);

const GearIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// FIX: Update the type of ICON_LIBRARY to include the 'settings' property via an intersection type.
// This ensures the object matches its type definition and resolves downstream type errors.
export const ICON_LIBRARY: Record<CustomizableAction, Record<string, React.FC<IconProps>>> & { settings: Record<string, React.FC<IconProps>> } = {
  analyze: {
    'Sparkles': SparklesIcon,
    'MagnifyingGlass': MagnifyingGlassIcon,
  },
  improve: {
    'Check': CheckIcon,
    'MagicWand': MagicWandIcon,
  },
  validate: {
    'ShieldCheck': ShieldCheckIcon,
    'DocumentCheck': DocumentCheckIcon,
  },
  assistantTab: {
    'Sparkles': SparklesIcon,
    'Robot': RobotIcon,
  },
  generatorTab: {
    'LightningBolt': LightningBoltIcon,
    'FileCode': FileCodeIcon,
  },
  chatTab: {
    'Chat': ChatIcon,
    'Headset': HeadsetIcon,
  },
  generateAction: {
    'LightningBolt': LightningBoltIcon,
  },
  settings: {
    'Gear': GearIcon,
  }
};

export const DEFAULT_ICONS: Record<CustomizableAction, string> = {
    analyze: 'Sparkles',
    improve: 'Check',
    validate: 'ShieldCheck',
    assistantTab: 'Sparkles',
    generatorTab: 'LightningBolt',
    chatTab: 'Chat',
    generateAction: 'LightningBolt',
};