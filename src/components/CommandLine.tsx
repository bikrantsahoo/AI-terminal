import React, { useState, useRef, useEffect } from 'react';
import { useCommand } from '../context/CommandContext';
import { useAI } from '../context/AIContext';
import { ArrowRight } from 'lucide-react';

const CommandLine: React.FC = () => {
  const [input, setInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { executeCommand, historyIndex, navigateHistory } = useCommand();
  const { suggestions, getSuggestions, selectSuggestion } = useAI();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
    getSuggestions(e.target.value);
  };

  // Handle key presses
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        executeCommand(input);
        setInput('');
        getSuggestions('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      selectSuggestion(suggestions[0]);
      setInput(suggestions[0]);
    }
  };

  // Update input when history changes
  useEffect(() => {
    if (historyIndex !== null) {
      const { command } = executeCommand('', true);
      setInput(command);
      
      // Set cursor at the end of input
      if (inputRef.current) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = command.length;
            inputRef.current.selectionEnd = command.length;
          }
        }, 0);
      }
    }
  }, [historyIndex, executeCommand]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center py-1 group">
      <div className="text-green-500 mr-2 flex-shrink-0">
        <ArrowRight size={14} />
      </div>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none caret-blue-500"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        
        {suggestions.length > 0 && !input.includes(suggestions[0]) && (
          <div className="absolute left-0 top-0 text-zinc-500 pointer-events-none">
            {input}
            <span className="text-zinc-600">
              {suggestions[0].slice(input.length)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandLine;