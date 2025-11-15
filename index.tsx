import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { IconProvider } from './context/IconContext';
import { AppearanceProvider } from './context/ThemeContext';
import { EditorThemeProvider } from './context/EditorThemeContext';

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppearanceProvider>
      <EditorThemeProvider>
        <LanguageProvider>
          <IconProvider>
            <App />
          </IconProvider>
        </LanguageProvider>
      </EditorThemeProvider>
    </AppearanceProvider>
  </React.StrictMode>
);