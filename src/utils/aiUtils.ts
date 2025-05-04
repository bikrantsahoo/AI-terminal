// AI utilities for command suggestions and prompt generation

// Command database for autocompletion and suggestions
const commonCommands = [
  { command: 'help', description: 'Display help information' },
  { command: 'clear', description: 'Clear the terminal' },
  { command: 'echo', description: 'Display a line of text' },
  { command: 'date', description: 'Display the current date and time' },
  { command: 'ls', description: 'List directory contents' },
  { command: 'ls -la', description: 'List all files with details' },
  { command: 'cd', description: 'Change directory' },
  { command: 'mkdir', description: 'Make directories' },
  { command: 'touch', description: 'Create empty files' },
  { command: 'rm', description: 'Remove files or directories' },
  { command: 'cat', description: 'Concatenate and display file content' },
  { command: 'pwd', description: 'Print working directory' },
  { command: 'grep', description: 'Search for patterns in files' },
  { command: 'find', description: 'Search for files in a directory hierarchy' },
  { command: 'tar', description: 'Manipulate archive files' },
  { command: 'chmod', description: 'Change file permissions' },
  { command: 'chown', description: 'Change file owner and group' },
  { command: 'ssh', description: 'OpenSSH client' },
  { command: 'scp', description: 'Secure copy files between hosts' },
  { command: 'curl', description: 'Transfer data from or to a server' },
  { command: 'wget', description: 'Network downloader' },
  { command: 'git', description: 'Distributed version control system' },
  { command: 'git clone', description: 'Clone a repository' },
  { command: 'git pull', description: 'Fetch from and integrate with another repository' },
  { command: 'git push', description: 'Update remote refs along with associated objects' },
  { command: 'git status', description: 'Show the working tree status' },
  { command: 'git add', description: 'Add file contents to the index' },
  { command: 'git commit', description: 'Record changes to the repository' },
  { command: 'git branch', description: 'List, create, or delete branches' },
  { command: 'git checkout', description: 'Switch branches or restore working tree files' },
  { command: 'git merge', description: 'Join two or more development histories together' },
  { command: 'npm', description: 'Node Package Manager' },
  { command: 'npm install', description: 'Install a package' },
  { command: 'npm update', description: 'Update packages' },
  { command: 'npm run', description: 'Run scripts defined in package.json' },
  { command: 'docker', description: 'Docker container management' },
  { command: 'docker ps', description: 'List containers' },
  { command: 'docker images', description: 'List images' },
  { command: 'docker build', description: 'Build an image from a Dockerfile' },
  { command: 'docker run', description: 'Run a command in a new container' },
];

/**
 * Generate command suggestions based on user input
 */
export const generateSuggestions = (input: string): string[] => {
  if (!input.trim()) return [];
  
  // Find matching commands
  const matches = commonCommands
    .filter(cmd => cmd.command.startsWith(input.toLowerCase()))
    .map(cmd => cmd.command);
  
  // Return top 3 suggestions
  return matches.slice(0, 3);
};

/**
 * Generate context-aware command suggestions
 */
export const generateContextSuggestions = (commandHistory: string[]): string[] => {
  // In a real application, this would use more sophisticated AI algorithms
  // and would analyze the command history to provide contextual suggestions
  
  // For now, just return some common commands based on basic patterns
  const lastCommand = commandHistory[commandHistory.length - 1] || '';
  
  if (lastCommand.includes('git')) {
    return [
      'git status',
      'git add .',
      'git commit -m "Update code"',
      'git push origin main',
    ];
  }
  
  if (lastCommand.includes('npm')) {
    return [
      'npm run dev',
      'npm install express',
      'npm update',
      'npm test',
    ];
  }
  
  if (lastCommand.includes('docker')) {
    return [
      'docker ps',
      'docker images',
      'docker-compose up -d',
      'docker build -t myapp .',
    ];
  }
  
  // Default suggestions
  return [
    'ls -la',
    'git status',
    'npm run dev',
    'docker ps',
  ];
};