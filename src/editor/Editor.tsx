import { javascript } from '@codemirror/lang-javascript';
import { EditorView, basicSetup } from 'codemirror';
import Preact from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import '../index.css';
import { getCommands, setCommands } from '../storage';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';

const Editor: Preact.FunctionComponent = () => {
	const monacoEl = useRef<HTMLDivElement>(null);
	let editor: EditorView;
	const name = new URLSearchParams(window.location.search).get('name') ?? '';

	const save = () => {
		const code = editor.state.doc.toString();
		getCommands().then(async (commands) => {
			commands.filter((cmd) => cmd.name !== name);
			await setCommands([
				...commands,
				{
					name,
					code,
				},
			]);
		});
		return true;
	};

	useEffect(() => {
		(async () => {
			let commands = await getCommands();
			let thisCommand = commands.find((cmd) => cmd.name === name);
			editor = new EditorView({
				extensions: [
					basicSetup,
					javascript(),
					oneDark,
					keymap.of([
						{
							key: 'Alt-S',
							run: save,
						},
					]),
				],
				parent: monacoEl.current!,
				doc: thisCommand?.code || '',
			});
		})();
	}, []);

	return (
		<div class="flex flex-row">
			<div class="w-72 p-4">
				<h1>Shortcut: {name}</h1>
				<p>How to run a command:</p>
				<pre data-lang="javascript">commandName(...args)</pre>
				<p>Example:</p>
				<pre data-lang="javascript">newTab("https://google.com")</pre>

				<button class="btn" onClick={save}>
					Save
				</button>
			</div>
			<div
				onClick={() => {
					editor.focus();
				}}
				class="h-[100vh] w-[calc(100vw-18rem)] bg-[#2a2c34] text-black"
				ref={monacoEl}
			></div>
		</div>
	);
};

export default Editor;
