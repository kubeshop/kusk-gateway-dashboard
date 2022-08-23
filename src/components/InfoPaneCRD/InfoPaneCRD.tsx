import {ghcolors} from 'react-syntax-highlighter/dist/esm/styles/prism';

import * as S from './styled';

interface IProps {
  yaml: string;
}

const InfoPaneCRD: React.FC<IProps> = props => {
  const {yaml} = props;

  return (
    <S.InfoPaneCRD
      language="yaml"
      style={ghcolors}
      customStyle={{fontFamily: 'roboto', fontSize: 14, fontWeight: 700}}
      wrapLines
      wrapLongLines
    >
      {yaml}
    </S.InfoPaneCRD>
  );
};

export default InfoPaneCRD;
