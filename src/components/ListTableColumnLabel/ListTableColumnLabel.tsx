import * as S from './styled';

interface IProps {
  itemKey: string;
  value: string;
  selectedKey: string | null;
  showSelectArrow?: boolean;
}

const ListTableColumnLabel: React.FC<IProps> = props => {
  const {itemKey, selectedKey = null, showSelectArrow = false, value} = props;

  return (
    <S.ListTableColumnLabelContainer $selected={itemKey === selectedKey}>
      {value}

      {showSelectArrow && <S.RightOutlined $disabled={itemKey === selectedKey} />}
    </S.ListTableColumnLabelContainer>
  );
};

export default ListTableColumnLabel;
