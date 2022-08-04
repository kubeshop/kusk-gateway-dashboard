import {ReactNode} from 'react';

import {ApiItem, EnvoyFleetItem, StaticRouteItem} from '@redux/services/kuskApi';

import * as S from './styled';

interface IProps {
  listElement: ReactNode;
  selectedTableItem: ApiItem | EnvoyFleetItem | StaticRouteItem | null;
}

const Dashboard: React.FC<IProps> = props => {
  const {listElement, selectedTableItem} = props;

  return <S.DashboardContainer $isTableItemSelected={Boolean(selectedTableItem)}>{listElement}</S.DashboardContainer>;
};

export default Dashboard;
