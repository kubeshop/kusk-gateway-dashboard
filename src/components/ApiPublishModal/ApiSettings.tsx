import ApiInfo from './ApiInfo';
import Path from './extensions/Path';
import Validation from './extensions/Validation';
import Websocket from './extensions/Websocket';

const ApiSettings = () => {
  return (
    <>
      <ApiInfo />
      <Path />
      <Validation />
      <Websocket />
    </>
  );
};

export default ApiSettings;
