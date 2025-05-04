import { CommandResult } from '../../types';

export const executeDate = (_args: string[]): CommandResult => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  
  const formattedDate = now.toLocaleDateString(undefined, options);
  
  return {
    output: `<span class="text-yellow-400">${formattedDate}</span>`,
  };
};