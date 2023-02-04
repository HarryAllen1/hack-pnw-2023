// the chrome namespace doesn't exist in the browser

export interface Command {
  name: string;
  code: string;
}

export const getCommands = async (): Promise<Command[]> => {
  if (typeof chrome !== 'undefined' && 'storage' in chrome)
    return (await chrome.storage.sync.get('commands')).commands ?? [];
  else return JSON.parse(localStorage.getItem('commands') ?? '[]');
};

export const setCommands = async (commands: Command[]) => {
  if (typeof chrome !== 'undefined' && 'storage' in chrome)
    await chrome.storage.sync.set({ commands });
  else localStorage.setItem('commands', JSON.stringify(commands));
};
