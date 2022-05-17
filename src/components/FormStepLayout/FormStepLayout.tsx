import {FC} from 'react';

interface IProps {
  visible: boolean;
}
const FormStepLayout: FC<IProps> = ({visible, children}) => {
  return <div style={{display: visible ? 'block' : 'none'}}>{children}</div>;
};

export default FormStepLayout;
