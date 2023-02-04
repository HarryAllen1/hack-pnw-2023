import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Preact from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
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
          language: 'typescript',
          theme: 'vs-dark',
        }) as monaco.editor.IStandaloneCodeEditor | any;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  return <div className={styles.Editor} ref={monacoEl}></div>;
};

export default Editor;
