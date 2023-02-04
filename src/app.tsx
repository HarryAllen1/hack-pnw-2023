import './app.css';
import { getCommands, setCommands } from './storage';
import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

const modules = import.meta.glob('./functions/**/*.ts');

export const App: FunctionComponent = () => {
  useEffect(() => {
    (async () => {
      await setCommands([
        {
          name: 'asdf',
          code: "console.log('asdf');",
        },
      ]);
      const commands = await getCommands();
      console.log(commands);
    })();
  }, []);
  return (
    <>
      {/* <h1>Commands</h1>
      <div className="flex flex-col">
        {commands.map((command) => (
          <div className="flex flex-row">
            {}

      </div> */}
    </>
  );
};
