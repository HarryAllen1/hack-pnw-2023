import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Preact from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import '../index.css';
import { Command, getCommands, setCommands } from '../storage';
import styles from './Editor.module.css';
import './userWorker';
import functions from './functions?raw';

const Editor: Preact.FunctionComponent = () => {
	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef(null);

	const [commands, setCmds] = useState<Command[]>([]);

	useEffect(() => {
		(async () => {
			await setCommands([
				{
					name: 'asdf',
					code: "console.log('asdf');",
				},
			]);
			setCmds(await getCommands());
		})();
	}, []);

	useEffect(() => {
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
					value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
						'\n'
					),
					language: 'typescript',
					theme: localStorage.getItem('shortcuts-editor-theme') || 'vs-dark',
				}) as monaco.editor.IStandaloneCodeEditor | any;
			});
		}

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
			<p>
				Available commands:
				<br />
				<div className="flex flex-row">
					{commands.map((cmd) => (
						<div className="flex flex-row">
							<code className="mr-2">
								<pre>{cmd.name}</pre>
							</code>
							:
							<code className="ml-2">
								<pre>{cmd.code}</pre>
							</code>
						</div>
					))}
				</div>
			</p>
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
			<div className={styles.Editor} ref={monacoEl}></div>
		</div>
	);
};

export default Editor;
