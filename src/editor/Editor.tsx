import { javascript } from '@codemirror/lang-javascript';
import { EditorView, basicSetup } from 'codemirror';
import type Preact from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import '../index.css';
import { getCommands, setCommands } from '../storage';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import functionSigs from './functionTypes.d.ts?raw';

const Editor: Preact.FunctionComponent = () => {
	const monacoEl = useRef<HTMLDivElement>(null);
	const [editor, setEditor] = useState<EditorView>();
	const name = new URLSearchParams(window.location.search).get('name') ?? '';
	const [functions, setFunctions] = useState<any>(null);
	const [functionTypes, setFunctionTypes] = useState<any>(null);

	//console.log(functionSigs);

	const functionSignatures = functionSigs.split('export declare const ');
	const functionNames = functionSignatures.map((func: string) => {
		return func.split(':')[0];
	});
	const functionParameters = functionSignatures.map((func: string) => {
		console.log(func.split(':(')[1]);
		return func.split(':(')[1]?.split(')')[0];
	});

	import('../functions').then((mod) =>
		setFunctions(
			Object.entries(mod).map(([name, func]) => ({
				label: name,
				type: 'function',
			}))
		)
	);

	const save = () => {
		const code = editor!.state.doc.toString();
		console.log(code, name);
		getCommands().then(async (commands) => {
			const actualCommands = commands.filter((cmd) => cmd.name !== name);
			console.log(actualCommands);
			await setCommands([
				...actualCommands,
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
			const commands = await getCommands();
			const thisCommand = commands.find((cmd) => cmd.name === name);
			setEditor(
				new EditorView({
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
				})
			);
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

				{functions && (
					<select
						class="w-full"
						onChange={(e) => {
							const func = functions.find(
								(f: any) => f.label === ((e.target as any).value as string)
							);
							if (func) {
								editor?.dispatch({
									changes: {
										from: editor.state.doc.length,
										insert: `${func.label}(${
											functionParameters[functionNames.indexOf(func.label)]
										})`,
									},
								});
							}
						}}
					>
						{functions.map((func: any) => (
							<option value={func.label}>{func.label}</option>
						))}
					</select>
				)}
			</div>
			<div
				onClick={() => {
					editor?.focus();
				}}
				class="h-[100vh] w-[calc(100vw-18rem)] bg-[#2a2c34] text-black"
				ref={monacoEl}
			></div>
		</div>
	);
};

export default Editor;
