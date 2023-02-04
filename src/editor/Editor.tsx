import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Preact from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import '../index.css';
import styles from './Editor.module.css';
import './userWorker';

const Editor: Preact.FunctionComponent = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return;

        return monaco.editor.create(monacoEl.current!, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
            '\n'
          ),
          language: 'javascript',
          theme: 'atom-one-dark',
        }) as monaco.editor.IStandaloneCodeEditor | any;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  return (
    <div>
      <h1>
        Shortcut: {new URLSearchParams(window.location.search).get('shortcut')}
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
          <code className="ml-5">
            <pre>{`newTab(url: string)`}</pre>
          </code>
          ,
          <code className="ml-5">
            <pre>{`newWindow(url: string)`}</pre>
          </code>
          ,
          <code className="ml-5">
            <pre>{`newIncognitoWindow(url: string)`}</pre>
          </code>
        </div>
      </p>
      <label for="themePicker">Theme</label>
      <select
        onChange={(e) => {
          if ((e.target as HTMLSelectElement).value)
            monaco.editor.setTheme((e.target as HTMLSelectElement).value);
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
