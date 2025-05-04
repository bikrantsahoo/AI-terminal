import React, { createContext, useContext, useState, useCallback } from 'react';
import { Command } from '../types';
import { parseCommand } from '../utils/commandParser';

interface CommandContextType {
  commands: Command[];
  historyIndex: number | null;
  executeCommand: (input: string, preview?: boolean) => { command: string };
  navigateHistory: (direction: 'up' | 'down') => void;
}

const CommandContext = createContext<CommandContextType>({
  commands: [],
  historyIndex: null,
  executeCommand: () => ({ command: '' }),
  navigateHistory: () => {},
});

export const useCommand = () => useContext(CommandContext);

export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [commands, setCommands] = useState<Command[]>([
    {
      input: 'welcome',
      output: 'Welcome to the <span class="text-blue-400 font-semibold">AI Terminal</span>! Type <span class="text-green-400">help</span> to see available commands.',
      timestamp: new Date(),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  // Execute a command and add it to history
  const executeCommand = useCallback((input: string, preview = false): { command: string } => {
    if (preview) {
      // Just return the command at the current history index for preview purposes
      if (historyIndex !== null) {
        const historyCommand = commands[commands.length - 1 - historyIndex];
        return { command: historyCommand ? historyCommand.input : '' };
      }
      return { command: '' };
    }

    // Actually execute the command
    const result = parseCommand(input);
    
    setCommands(prev => [...prev, result]);
    setHistoryIndex(null);
    
    return { command: input };
  }, [commands, historyIndex]);

  // Navigate command history
  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up') {
      setHistoryIndex(prev => {
        if (prev === null) return 0;
        return Math.min(prev + 1, commands.length - 1);
      });
    } else {
      setHistoryIndex(prev => {
        if (prev === null || prev === 0) return null;
        return prev - 1;
      });
    }
  }, [commands.length]);

  return (
    <CommandContext.Provider value={{ commands, historyIndex, executeCommand, navigateHistory }}>
      {children}
    </CommandContext.Provider>
  );
};