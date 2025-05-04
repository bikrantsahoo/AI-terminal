import React from 'react';
import { Command } from '../types';

interface CommandOutputProps {
  commands: Command[];
}

const CommandOutput: React.FC<CommandOutputProps> = ({ commands }) => {
  return (
    <div className="space-y-2">
      {commands.map((cmd, index) => (
        <div key={index} className="pb-1">
          {/* Command input line */}
          <div className="flex items-start text-green-500">
            <span className="mr-2">$</span>
            <span className="text-blue-400">{cmd.input}</span>
          </div>
          
          {/* Command output */}
          {cmd.output && (
            <div 
              className="pl-5 pt-1 text-zinc-300 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: cmd.output }}
            />
          )}
          
          {/* Error output with styling */}
          {cmd.error && (
            <div className="pl-5 pt-1 text-red-400 whitespace-pre-wrap">
              {cmd.error}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommandOutput;