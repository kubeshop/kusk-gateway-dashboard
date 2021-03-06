import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

import * as S from './styled';

interface IProps {
  yaml: string;
}

const InfoPaneCRD: React.FC<IProps> = props => {
  const {yaml} = props;

  return (
    <S.InfoPaneCRD language="yaml" style={atomDark} wrapLines wrapLongLines>
      {yaml}
    </S.InfoPaneCRD>
  );
};

export default InfoPaneCRD;
