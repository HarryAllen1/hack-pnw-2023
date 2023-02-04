import { FunctionComponent } from 'preact';
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
            <h1>{key.split('/').pop()}</h1>
            <button onClick={() => module().then((m: any) => m.default())}>
              Run
            </button>
          </div>
        );
      })}
      <button onClick={() => {window.open('dist/editor.html', '_blank')}}>Open Editor</button>
    </>
  );
};
