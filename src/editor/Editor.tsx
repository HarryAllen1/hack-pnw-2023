import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Preact from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import '../index.css';
import { getCommands, setCommands } from '../storage';
import styles from './Editor.module.css';
import functions from './functionTypes.d.ts?raw';
import './userWorker';
import { getHighlighter, setCDN } from 'shiki';

const Editor: Preact.FunctionComponent = () => {
	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef(null);

	//close the window.opener when the window is closed
	window.addEventListener('beforeunload', async (event) => {
		event.preventDefault();
		window.opener?.close();
	});

	useEffect(() => {
		setCDN('https://unpkg.com/shiki/');
		getHighlighter({
			theme: 'one-dark-pro',
			langs: ['typescript'],
		}).then((hl) => {
			document.querySelectorAll('pre').forEach((block) => {
				const code = hl.codeToHtml(block.textContent!, { lang: 'typescript' });
				block.innerHTML = code;
			});
		});
	}, []);

	useEffect(() => {
		(async () => {
			let commands = await getCommands();
			let thisCommand = commands.find(
				(cmd) =>
					cmd.name === new URLSearchParams(window.location.search).get('name')
			);
			if (monacoEl) {
				setEditor((editor) => {
					if (editor) return;

					console.log(functions);

					monaco.languages.typescript.javascriptDefaults.addExtraLib(
						functions,
						'ts:filename/functions.d.ts'
					);
					monaco.editor.createModel(
						functions,
						'typescript',
						monaco.Uri.parse('ts:filename/functions.d.ts')
					);

					return monaco.editor.create(monacoEl.current!, {
						value: [thisCommand?.code].join('\n'),
						language: 'javascript',
						theme: localStorage.getItem('shortcuts-editor-theme') || 'vs-dark',
					}) as monaco.editor.IStandaloneCodeEditor | any;
				});
			}
		})();

		return () => editor?.dispose();
	}, [monacoEl.current]);

	return (
		<div class="flex flex-row">
			<div class="w-72 p-4">
				<h1>
					Shortcut: {new URLSearchParams(window.location.search).get('name')}
				</h1>
				<p>How to run a command:</p>
				<pre>commandName(...args)</pre>
				<p>Example:</p>
				<pre>newTab("https://google.com")</pre>

				<br />
				<label for="themePicker">Theme</label>
				<select
					onChange={(e) => {
						if ((e.target as HTMLSelectElement).value)
							monaco.editor.setTheme((e.target as HTMLSelectElement).value);
						localStorage.setItem(
							'shortcuts-editor-theme',
							(e.target as HTMLSelectElement).value
						);
					}}
					name="themePicker"
					id="themePicker"
				>
					<option value=""></option>
					<option value="vs-dark">VS Dark</option>
					<option value="vs">VS Light</option>
				</select>
				<button
					onClick={() => {
						monaco.editor
							.getEditors()[0]
							.getAction('editor.action.formatDocument')
							.run();
					}}
				>
					Format
				</button>
				<br />
				<button
					onClick={async () => {
						console.log(monaco.editor.getEditors()[0]);
						const code = monaco.editor.getEditors()[0]?.getValue();
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
			<div className={styles.Editor} ref={monacoEl}></div>
		</div>
	);
};

export default Editor;
