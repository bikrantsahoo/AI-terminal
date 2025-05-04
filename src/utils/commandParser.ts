import { Command } from '../types';
import { executeHelp } from './commands/help';
import { executeEcho } from './commands/echo';
import { executeClear } from './commands/clear';
import { executeDate } from './commands/date';
import { executeList } from './commands/list';

// Parse and execute a command
export const parseCommand = (input: string): Command => {
  const commandParts = input.trim().split(' ');
  const command = commandParts[0].toLowerCase();
  const args = commandParts.slice(1);
  
  let result = {
    output: '',
    error: undefined,
  };
  
  // Execute the appropriate command
  switch (command) {
    case 'help':
      result = executeHelp(args);
      break;
    case 'echo':
      result = executeEcho(args);
      break;
    case 'clear':
      result = executeClear(args);
      break;
    case 'date':
      result = executeDate(args);
      break;
    case 'ls':
    case 'dir':
      result = executeList(args);
      break;
    case 'welcome':
      result.output = 'Welcome to the <span class="text-blue-400 font-semibold">AI Terminal</span>! Type <span class="text-green-400">help</span> to see available commands.';
      break;
    default:
      result.error = `Command not found: ${command}. Type 'help' to see available commands.`;
  }
  
  return {
    input,
    output: result.output,
    error: result.error,
    timestamp: new Date(),
  };
};