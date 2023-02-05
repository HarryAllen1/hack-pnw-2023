// the chrome namespace doesn't exist in the browser
export interface Command {
	name: string;
	code: string;
}

export const getCommands = async (): Promise<Command[]> => {
	let commands: Command[] = [];
	if (typeof chrome !== 'undefined' && 'storage' in chrome) {
		console.log("you are using chrome");
		chrome.storage.local.get('commands', (res) => {
			commands = res.commands;
		});
		return commands;
	} else return JSON.parse(localStorage.getItem('commands') ?? '[]');
};

export const setCommands = async (commands: Command[]) => {
	if (typeof chrome !== 'undefined' && 'storage' in chrome){
			await chrome.storage.local.set({ commands });
			chrome.storage.local.get('commands', (res) => {
				console.log('res', res)
			});
	}
	else localStorage.setItem('commands', JSON.stringify(commands));
	console.log('commands', commands);
};

export const setCommand = async (name: string, code: string) => {
	const commands = await getCommands();
	const index = commands.findIndex((command) => command.name === name);
	if (index === -1) commands.push({ name, code });
	else commands[index].code = code;
	await setCommands(commands);
};
