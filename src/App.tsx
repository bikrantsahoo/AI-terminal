import React from 'react';
import Terminal from './components/Terminal';
import { ThemeProvider } from './context/ThemeContext';
import { CommandProvider } from './context/CommandContext';
import { AIProvider } from './context/AIContext';

function App() {
  return (
    <ThemeProvider>
      <AIProvider>
        <CommandProvider>
          <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
            <Terminal />
          </div>
        </CommandProvider>
      </AIProvider>
    </ThemeProvider>
  );
}

export default App;