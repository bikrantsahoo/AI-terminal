import React from 'react';
import { Terminal, Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TerminalHeader: React.FC = () => {
  const { theme, toggleTheme, themeMode } = useTheme();

  return (
    <div className={`px-4 py-2 border-b ${theme.borderColor} flex justify-between items-center`}>
      <div className="flex items-center space-x-2">
        <Terminal size={16} className="text-blue-500" />
        <h1 className="font-semibold">AI Terminal</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleTheme}
          className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
          aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {themeMode === 'dark' ? (
            <Sun size={16} className="text-zinc-400 hover:text-zinc-100" />
          ) : (
            <Moon size={16} className="text-zinc-400 hover:text-zinc-100" />
          )}
        </button>
        
        <button 
          className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
          aria-label="Open settings"
        >
          <Settings size={16} className="text-zinc-400 hover:text-zinc-100" />
        </button>
      </div>
    </div>
  );
};

export default TerminalHeader;