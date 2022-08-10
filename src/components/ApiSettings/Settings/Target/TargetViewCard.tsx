import {Button, Card, Typography} from 'antd';

import * as S from './styled';

interface IProps {
  toggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const TargetViewCard = ({toggleEditMode}: IProps) => {
  return (
    <Card
      title={
        <div>
          <Typography.Title>
            bbbb
            <S.TargetTag $type="upstream">upstream</S.TargetTag>
          </Typography.Title>
          <Typography.Text>XXX</Typography.Text>
        </div>
      }
      extra={
        <Button type="text" onClick={() => toggleEditMode(true)}>
          Edit
        </Button>
      }
    />
  );
};
export default TargetViewCard;
