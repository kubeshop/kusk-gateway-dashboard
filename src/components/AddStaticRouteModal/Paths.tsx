import {Button, Form, FormInstance} from 'antd';

const {List: FormList} = Form;

interface IProps {
  form: FormInstance<any>;
  setAddPathModal: (open: boolean) => void;
}

const Paths: React.FC<IProps> = ({setAddPathModal}) => {
  return <FormList name="paths">{() => <Button onClick={() => setAddPathModal(true)}>Add Path</Button>}</FormList>;
};

export default Paths;
