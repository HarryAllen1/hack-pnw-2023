// the chrome namespace doesn't exist in the browser
export interface Command {
	name: string;
	code: string;
}

export const getCommands = async (): Promise<Command[]> => {
	return JSON.parse(localStorage.getItem('commands') ?? '[]');
};

export const setCommands = async (commands: Command[]) => {
	console.log('called', commands);
	localStorage.setItem('commands', JSON.stringify(commands));
	console.log('commands', commands);
};

export const setCommand = async (name: string, code: string) => {
	const commands = await getCommands();
	const index = commands.findIndex((command) => command.name === name);
	if (index === -1) commands.push({ name, code });
	else commands[index].code = code;
	await setCommands(commands);
};
