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
