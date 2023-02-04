import './app.css';
import { getCommands } from './storage';

const modules = import.meta.glob('./functions/**/*.ts');

export const App = async () => {
  const commands = await getCommands();

  return (
    <>
      <h1>Commands</h1>
      <div className="flex flex-col"></div>
    </>
  );
};
