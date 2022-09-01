import {Monaco} from '@components/Monaco';

interface IProps {
  yaml: string;
}

const InfoPaneCRD: React.FC<IProps> = props => {
  const {yaml} = props;

  return <Monaco fullWidth openapi={yaml} />;
};

export default InfoPaneCRD;
