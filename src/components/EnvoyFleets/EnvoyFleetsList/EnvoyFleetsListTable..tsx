import {EnvoyFleetItem} from '@models/api';

import * as S from './EnvoyFleetsListTable.styled';

interface IProps {
  envoyFleets: EnvoyFleetItem[];
}

const EnvoyFleetsListTable: React.FC<IProps> = () => {
  return <S.Table pagination={false} tableLayout="fixed" />;
};

export default EnvoyFleetsListTable;
