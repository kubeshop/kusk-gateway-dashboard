import * as S from './KuskExtensionsPanelHeader.styled';

interface IProps {
  level: string;
  path: string;
  method?: string;
  tag?: string;
}

const KuskExtensionsPanelHeader: React.FC<IProps> = props => {
  const {level, method = '', path, tag = ''} = props;

  return (
    <S.HeaderContainer>
      {level === 'operation' && <S.LabelTag>{tag}</S.LabelTag>} {path}
      {level === 'operation' && <S.LabelMethodTag $method={method}>{method.toUpperCase()}</S.LabelMethodTag>}
    </S.HeaderContainer>
  );
};

export default KuskExtensionsPanelHeader;
