export interface Command {
  input: string;
  output?: string;
  error?: string;
  timestamp: Date;
}

export interface CommandResult {
  output?: string;
  error?: string;
}

export interface AIPrompt {
  text: string;
  category: 'file' | 'git' | 'npm' | 'system' | 'custom';
}

export interface CommandHandler {
  execute: (args: string[]) => CommandResult;
}