import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Preact from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import functions from '../functions?raw';
import '../index.css';
import { Command, getCommands, setCommands } from '../storage';
import styles from './Editor.module.css';
import './userWorker';

const Editor: Preact.FunctionComponent = () => {
	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef(null);

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
						language: 'typescript',
						theme: localStorage.getItem('shortcuts-editor-theme') || 'vs-dark',
					}) as monaco.editor.IStandaloneCodeEditor | any;
				});
			}
		})();

		return () => editor?.dispose();
	}, [monacoEl.current]);

	return (
		<div>
			<h1>
				Shortcut: {new URLSearchParams(window.location.search).get('name')}
			</h1>
			<p>
				How to run a command:
				<br />
				commandName(arg1, arg2, arg3, ...)
				<br />
				<br />
				Example:
				<code>
					<pre>{`newTab("https://google.com")`}</pre>
				</code>
			</p>
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
					console.log('saving...');
					const code = editor?.getValue();
					if (code) {
						const worker = new Worker('userWorker.js');
						await setCommands([
							...(await getCommands()),
							{
								name:
									new URLSearchParams(window.location.search).get('name') || '',
								code: code,
							},
						]);
						console.log('saved');
					}
				}}
			>
				Save
			</button>
			<div className={styles.Editor} ref={monacoEl}></div>
		</div>
	);
};

export default Editor;
