import { FunctionComponent } from 'preact';
import Editor from './Editor';
import './app.css';

const modules = import.meta.glob('./functions/**/*.ts');

export const App: FunctionComponent = () => {
  return (
    <>
      {/* test every folder in the functions folder */}
      {Object.keys(modules).map((key) => {
        const module = modules[key];
        return (
          <div>
            <h1>{key}</h1>
            <button onClick={() => module().then((m: any) => m.default())}>
              Run
            </button>
          </div>
        );
      })}
      <Editor />
    </>
  );
};
