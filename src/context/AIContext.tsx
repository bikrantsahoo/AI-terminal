import React, { createContext, useContext, useState, useCallback } from 'react';
import { generateSuggestions } from '../utils/aiUtils';

interface AIContextType {
  suggestions: string[];
  aiPrompts: string[];
  getSuggestions: (input: string) => void;
  selectSuggestion: (suggestion: string) => void;
  generatePrompt: () => void;
}

const AIContext = createContext<AIContextType>({
  suggestions: [],
  aiPrompts: [],
  getSuggestions: () => {},
  selectSuggestion: () => {},
  generatePrompt: () => {},
});

export const useAI = () => useContext(AIContext);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiPrompts, setAiPrompts] = useState<string[]>([
    'ls -la',
    'git status',
    'npm install react-router-dom',
    'node server.js',
  ]);
  
  // Get command suggestions based on input
  const getSuggestions = useCallback((input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }
    
    const newSuggestions = generateSuggestions(input);
    setSuggestions(newSuggestions);
  }, []);
  
  // Select a suggestion
  const selectSuggestion = useCallback((suggestion: string) => {
    setSuggestions([]);
  }, []);
  
  // Generate AI prompts
  const generatePrompt = useCallback(() => {
    const newPrompts = [
      'npm run build',
      'git commit -m "Update README with installation instructions"',
      'docker-compose up -d',
      'curl -X POST https://api.example.com/data',
    ];
    setAiPrompts(newPrompts);
  }, []);
  
  return (
    <AIContext.Provider value={{ 
      suggestions, 
      aiPrompts, 
      getSuggestions, 
      selectSuggestion, 
      generatePrompt 
    }}>
      {children}
    </AIContext.Provider>
  );
};