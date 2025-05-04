import { CommandResult } from '../../types';

export const executeClear = (_args: string[]): CommandResult => {
  // This doesn't actually return anything because the CommandContext
  // will handle the clearing of the terminal
  return {
    output: '<span class="text-green-400">Terminal cleared</span>',
  };
};