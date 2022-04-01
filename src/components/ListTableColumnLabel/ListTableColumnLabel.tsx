import * as S from './styled';

interface IProps {
  itemKey: string;
  value: string;
  selectedKey: string | null;
  showSelectArrow?: boolean;
  onSelectArrowClick?: () => void;
}

const ListTableColumnLabel: React.FC<IProps> = props => {
  const {itemKey, selectedKey = null, showSelectArrow = false, value, onSelectArrowClick} = props;

  const onSelectArrowClickHandler = () => {
    if ((!selectedKey || itemKey !== selectedKey) && onSelectArrowClick) {
      onSelectArrowClick();
    }
  };

  return (
    <S.ListTableColumnLabelContainer $selected={itemKey === selectedKey}>
      {value}

      {showSelectArrow && <S.RightOutlined $disabled={itemKey === selectedKey} onClick={onSelectArrowClickHandler} />}
    </S.ListTableColumnLabelContainer>
  );
};

export default ListTableColumnLabel;
