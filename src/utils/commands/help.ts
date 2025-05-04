import { CommandResult } from '../../types';

export const executeHelp = (args: string[]): CommandResult => {
  // If help is called with an argument, show help for that specific command
  if (args.length > 0) {
    return getSpecificHelp(args[0]);
  }
  
  // Otherwise show general help
  return {
    output: `
<div class="space-y-4">
  <div>
    <span class="text-blue-400 font-semibold">Available Commands:</span>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div>
      <span class="text-green-400">help</span> - Display this help message
    </div>
    <div>
      <span class="text-green-400">clear</span> - Clear the terminal
    </div>
    <div>
      <span class="text-green-400">echo [text]</span> - Display text
    </div>
    <div>
      <span class="text-green-400">date</span> - Display current date and time
    </div>
    <div>
      <span class="text-green-400">ls</span> - List files in current directory
    </div>
  </div>
  
  <div>
    <span class="text-zinc-400">Type <span class="text-green-400">help [command]</span> for more information about a specific command.</span>
  </div>
</div>
    `,
  };
};

const getSpecificHelp = (command: string): CommandResult => {
  switch (command.toLowerCase()) {
    case 'help':
      return {
        output: `
<div>
  <span class="text-blue-400 font-semibold">help</span>
  
  <p class="mt-2">Displays help information for commands.</p>
  
  <div class="mt-2">
    <span class="text-green-400">Usage:</span> help [command]
  </div>
  
  <div class="mt-2">
    <span class="text-green-400">Examples:</span>
    <div class="pl-4 mt-1">
      <div>help</div>
      <div>help echo</div>
    </div>
  </div>
</div>
        `,
      };
    
    case 'echo':
      return {
        output: `
<div>
  <span class="text-blue-400 font-semibold">echo</span>
  
  <p class="mt-2">Displays text in the terminal.</p>
  
  <div class="mt-2">
    <span class="text-green-400">Usage:</span> echo [text]
  </div>
  
  <div class="mt-2">
    <span class="text-green-400">Examples:</span>
    <div class="pl-4 mt-1">
      <div>echo Hello, World!</div>
      <div>echo "This is a test"</div>
    </div>
  </div>
</div>
        `,
      };
    
    case 'clear':
      return {
        output: `
<div>
  <span class="text-blue-400 font-semibold">clear</span>
  
  <p class="mt-2">Clears the terminal screen.</p>
  
  <div class="mt-2">
    <span class="text-green-400">Usage:</span> clear
  </div>
</div>
        `,
      };
    
    case 'date':
      return {
        output: `
<div>
  <span class="text-blue-400 font-semibold">date</span>
  
  <p class="mt-2">Displays the current date and time.</p>
  
  <div class="mt-2">
    <span class="text-green-400">Usage:</span> date
  </div>
</div>
        `,
      };
    
    case 'ls':
    case 'dir':
      return {
        output: `
<div>
  <span class="text-blue-400 font-semibold">ls</span>
  
  <p class="mt-2">Lists files and directories in the current location.</p>
  
  <div class="mt-2">
    <span class="text-green-400">Usage:</span> ls [options]
  </div>
  
  <div class="mt-2">
    <span class="text-green-400">Options:</span>
    <div class="pl-4 mt-1">
      <div>-a  Show all files, including hidden files</div>
      <div>-l  Show detailed information</div>
    </div>
  </div>
  
  <div class="mt-2">
    <span class="text-green-400">Examples:</span>
    <div class="pl-4 mt-1">
      <div>ls</div>
      <div>ls -la</div>
    </div>
  </div>
</div>
        `,
      };
    
    default:
      return {
        error: `No help available for command: ${command}`,
      };
  }
};