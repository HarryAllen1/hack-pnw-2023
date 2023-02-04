// the chrome namespace doesn't exist in the browser
export interface Command {
  name: string;
  code: string;
}


export interface Shortcut {
  name: string;
  shortcut: string;
  cmd : Command;
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

export const setCommand = async (name: string, code: string) => {
  const commands = await getCommands();
  const index = commands.findIndex((command) => command.name === name);
  if (index === -1) commands.push({ name, code });
  else commands[index].code = code;
  await setCommands(commands);
};
