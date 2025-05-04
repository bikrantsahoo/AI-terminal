import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useAI } from '../context/AIContext';
import { useCommand } from '../context/CommandContext';

const AIPromptBar: React.FC = () => {
  const [showPrompts, setShowPrompts] = useState(false);
  const { aiPrompts, generatePrompt } = useAI();
  const { executeCommand } = useCommand();

  const handlePromptClick = (prompt: string) => {
    executeCommand(prompt);
    setShowPrompts(false);
  };
  
  return (
    <div className="border-t border-zinc-800 bg-zinc-900">
      <div className="px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => {
            setShowPrompts(!showPrompts);
            if (!showPrompts) generatePrompt();
          }}
          className="flex items-center space-x-2 text-sm text-zinc-400 hover:text-blue-400 transition-colors"
        >
          <Sparkles size={14} />
          <span>AI Suggestions</span>
        </button>
        
        <div className="text-xs text-zinc-500">
          Press Tab to autocomplete
        </div>
      </div>
      
      {showPrompts && (
        <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700/50 transition-all">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-zinc-300">Suggested Commands</h3>
            <button 
              onClick={() => setShowPrompts(false)}
              className="text-zinc-400 hover:text-zinc-200"
            >
              <X size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {aiPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-left p-2 rounded text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 transition-colors truncate"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPromptBar;