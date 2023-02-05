import Preact from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import '../index.css';
import { EditorView, basicSetup } from 'codemirror';
import { getCommands, setCommands } from '../storage';
import styles from './Editor.module.css';
import { javascript } from '@codemirror/lang-javascript';

const Editor: Preact.FunctionComponent = () => {
	const monacoEl = useRef<HTMLDivElement>(null);
	let editor: EditorView;
	useEffect(() => {
		(async () => {
			let commands = await getCommands();
			let thisCommand = commands.find(
				(cmd) =>
					cmd.name === new URLSearchParams(window.location.search).get('name')
			);
			editor = new EditorView({
				extensions: [basicSetup, javascript()],
				parent: monacoEl.current!,
				doc: thisCommand?.code || '',
			});
		})();
	}, []);

	return (
		<div class="flex flex-row">
			<div class="w-72 p-4">
				<h1>
					Shortcut: {new URLSearchParams(window.location.search).get('name')}
				</h1>
				<p>How to run a command:</p>
				<pre data-lang="javascript">commandName(...args)</pre>
				<p>Example:</p>
				<pre data-lang="javascript">newTab("https://google.com")</pre>

				<button
					onClick={async () => {
						const code = editor.state.doc.toString();
						if (code) {
							let commands = (await getCommands()).filter(
								(cmd) =>
									cmd.name !==
									new URLSearchParams(window.location.search).get('name')
							);
							await setCommands([
								...commands,
								{
									name:
										new URLSearchParams(window.location.search).get('name') ||
										'',
									code: code,
								},
							]);
							console.log(await getCommands());
						}
					}}
				>
					Save
				</button>
			</div>
			<div
				class="h-[100vh] w-[calc(100vw-18rem)] bg-white text-black"
				ref={monacoEl}
			></div>
		</div>
	);
};

export default Editor;
