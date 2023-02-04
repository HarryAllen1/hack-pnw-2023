// the chrome namespace doesn't exist in the browser

interface Command {
  name: string;
  code: string;
}

export const getCommands = async (): Promise<Command[]> => {
  if (chrome) return (await chrome.storage.sync.get('commands')).commands ?? [];
  else return JSON.parse(localStorage.getItem('commands') ?? '[]');
};

export const setCommands = async (commands: Command[]) => {
  if (chrome) await chrome.storage.sync.set({ commands });
  else localStorage.setItem('commands', JSON.stringify(commands));
};
