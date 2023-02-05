import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Preact from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import '../index.css';
import { getCommands, setCommands } from '../storage';
import styles from './Editor.module.css';
import functions from './functionTypes.d.ts?raw';
import './userWorker';

const Editor: Preact.FunctionComponent = () => {
	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef(null);

	useEffect(() => {
		document.querySelectorAll('pre').forEach((el) => {
			void monaco.editor.colorizeElement(el, {
				theme: 'vs-dark',
			});
		});
	}, []);

	useEffect(() => {
		void (async () => {
			const commands = await getCommands();
			const thisCommand = commands.find(
				(cmd) =>
					cmd.name === new URLSearchParams(window.location.search).get('name')
			);
			setEditor((editor) => {
				if (editor) return;

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
					theme: localStorage.getItem('shortcuts-editor-theme') ?? 'vs-dark',
				});
			});
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
				<pre data-lang="javascript">commandName(...args)</pre>
				<p>Example:</p>
				<pre data-lang="javascript">newTab("https://google.com")</pre>

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
						void monaco.editor
							.getEditors()[0]
							.getAction('editor.action.formatDocument')
							.run();
					}}
				>
					Format
				</button>
				<br />
				<button
					onClick={
						void (async () => {
							console.log(monaco.editor.getEditors()[0]);
							const code = monaco.editor.getEditors()[0]?.getValue();
							if (code) {
								const commands = (await getCommands()).filter(
									(cmd) =>
										cmd.name !==
										new URLSearchParams(window.location.search).get('name')
								);
								await setCommands([
									...commands,
									{
										name:
											new URLSearchParams(window.location.search).get('name') ??
											'',
										code: code,
									},
								]);
								console.log(await getCommands());
							}
						})
					}
				>
					Save
				</button>
			</div>
			<div className={styles.Editor} ref={monacoEl}></div>
		</div>
	);
};

export default Editor;
