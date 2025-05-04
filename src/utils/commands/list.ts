import { CommandResult } from '../../types';

export const executeList = (args: string[]): CommandResult => {
  // Parse options
  const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
  const showDetails = args.includes('-l') || args.includes('-la') || args.includes('-al');
  
  // Mock file system for demonstration
  const fileSystem = [
    { name: '.git', type: 'dir', size: '4096', modified: '2025-01-15 10:24' },
    { name: '.gitignore', type: 'file', size: '267', modified: '2025-01-14 15:38' },
    { name: 'node_modules', type: 'dir', size: '4096', modified: '2025-01-15 10:25' },
    { name: 'package.json', type: 'file', size: '542', modified: '2025-01-15 10:26' },
    { name: 'public', type: 'dir', size: '4096', modified: '2025-01-14 15:38' },
    { name: 'README.md', type: 'file', size: '2541', modified: '2025-01-14 15:38' },
    { name: 'src', type: 'dir', size: '4096', modified: '2025-01-15 10:27' },
    { name: '.env', type: 'file', size: '120', modified: '2025-01-15 10:28', hidden: true },
    { name: '.vscode', type: 'dir', size: '4096', modified: '2025-01-15 10:29', hidden: true },
  ];
  
  // Filter files based on options
  const filesToShow = fileSystem.filter(file => showAll || !file.hidden);
  
  // Generate output
  if (showDetails) {
    // Detailed list view
    const output = filesToShow
      .map(file => {
        const isDir = file.type === 'dir';
        const color = isDir ? 'text-blue-400' : 'text-zinc-300';
        const name = isDir ? `<span class="${color} font-semibold">${file.name}/</span>` : `<span class="${color}">${file.name}</span>`;
        return `<div class="grid grid-cols-5">
                  <span class="col-span-1">${isDir ? 'd' : '-'}rwxr-xr-x</span>
                  <span class="col-span-1 text-right pr-4">${file.size}</span>
                  <span class="col-span-2">${file.modified}</span>
                  <span class="col-span-1">${name}</span>
                </div>`;
      })
      .join('\n');
    
    return {
      output: `<div class="grid grid-cols-5 mb-2 text-zinc-500">
                <span class="col-span-1">Permissions</span>
                <span class="col-span-1 text-right pr-4">Size</span>
                <span class="col-span-2">Modified</span>
                <span class="col-span-1">Name</span>
               </div>
               ${output}`,
    };
  } else {
    // Simple list view
    const output = filesToShow
      .map(file => {
        const isDir = file.type === 'dir';
        const color = isDir ? 'text-blue-400' : 'text-zinc-300';
        const name = isDir ? `<span class="${color} font-semibold">${file.name}/</span>` : `<span class="${color}">${file.name}</span>`;
        return name;
      })
      .join('  ');
    
    return {
      output: `<div class="flex flex-wrap gap-4">${output}</div>`,
    };
  }
};