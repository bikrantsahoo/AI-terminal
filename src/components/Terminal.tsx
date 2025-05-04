import React, { useRef, useEffect, useState } from 'react';
import TerminalHeader from './TerminalHeader';
import CommandLine from './CommandLine';
import CommandOutput from './CommandOutput';
import AIPromptBar from './AIPromptBar';
import { useCommand } from '../context/CommandContext';
import { useTheme } from '../context/ThemeContext';

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { commands } = useCommand();
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus the terminal on mount
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
    setIsFocused(true);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto h-screen p-4">
      <div 
        className={`flex-1 flex flex-col overflow-hidden bg-zinc-900 rounded-lg shadow-2xl border ${theme.borderColor} transition-all duration-300 ${isFocused ? 'ring-2 ring-blue-500/30' : ''}`}
      >
        <TerminalHeader />
        
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm"
          onClick={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tabIndex={0}
        >
          <CommandOutput commands={commands} />
          <CommandLine />
        </div>
        
        <AIPromptBar />
      </div>
    </div>
  );
};

export default Terminal;