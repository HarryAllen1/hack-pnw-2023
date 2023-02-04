// the chrome namespace doesn't exist in the browser

export const getCommands = async (): Promise<{ [key: string]: any }> => {
  if (chrome) return chrome.storage.sync.get('commands');
  else return JSON.parse(localStorage.getItem('commands') ?? '{}');
};

export const setSettings = (settings: Record<string, any>) => {
  if (chrome) chrome.storage.sync.set({ settings });
  else localStorage.setItem('settings', JSON.stringify(settings));
};
