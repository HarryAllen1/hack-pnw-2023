import { FunctionComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import './app.css';
import { Command, getCommands, setCommands } from './storage';

export const App: FunctionComponent = () => {
	const [commands, setCmds] = useState<Command[]>([]);
	const [creating, setCreating] = useState(false);
	const newInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		document.title = 'Shortcut Editor';
		(async () => {
			setCmds(await getCommands());
		})();
	}, []);

	async function create() {
		let existingCommands = await getCommands();
		if (existingCommands.find((cmd) => cmd.name === newInput.current?.value)) {
			alert('A command with that name already exists!');
			return;
		}
		await setCommands([
			...(await getCommands()),
			{
				name: newInput.current?.value ?? 'New Command',
				code: "alert('You have not set this command yet!')",
			},
		]);
		setCmds([...(await getCommands())]);
		window.open(
			`editor.html?name=${newInput.current?.value}`,
			'editor',
			'popup'
		);
		setCreating(false);
	}
	return (
		<div className="w-48 h-96">
			<h1 class="text-2xl mb-2 text-center">Commands</h1>
			<div className="flex flex-col odd:bg-[rgba(0,0,0/0.3)]">
				{commands.map((cmd) => (
					<div className="flex flex-row justify-between">
						<div className="self-start">
							<div>{cmd.name}</div>
						</div>
						<div className="self-end">
							<button
								class="text-white"
								onClick={() => {
									Function(cmd.code)();
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
									/>
								</svg>
							</button>
							<button
								class="text-white"
								onClick={() => {
									window.open('editor.html?name=' + cmd.name, 'popup');
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
									/>
								</svg>
							</button>
							<button
								class="text-white"
								onClick={async () => {
									await setCommands(
										commands.filter((c) => c.name !== cmd.name)
									);
									setCmds(await getCommands());
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
						</div>
					</div>
				))}
			</div>
			<div>
				{creating ? (
					<>
						<input
							placeholder="Name"
							ref={newInput}
							onKeyDown={async (e) => {
								if (e.key === 'Enter') {
									await create();
								}
							}}
						/>
						<button
							onClick={async () => {
								await create();
							}}
						>
							Create
						</button>
					</>
				) : (
					<button
						class="btn"
						onClick={() => {
							setCreating(true);
						}}
					>
						New
					</button>
				)}
			</div>
		</div>
	);
};
