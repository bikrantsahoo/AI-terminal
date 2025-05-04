import { CommandResult } from '../../types';

export const executeEcho = (args: string[]): CommandResult => {
  // Join all arguments to create the output
  const output = args.join(' ');
  
  return {
    output,
  };
};