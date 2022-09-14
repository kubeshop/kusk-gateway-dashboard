import {Skeleton} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {useAppSelector} from '@redux/hooks';
import {useGetStaticRouteCrdQuery} from '@redux/services/enhancedApi';

import {InfoPaneCRD} from '@components';
import {ErrorLabel} from '@components/AntdCustom';

const CRD: React.FC = () => {
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);

  const {data, error, isLoading} = useGetStaticRouteCrdQuery({
    name: selectedStaticRoute?.name || '',
    namespace: selectedStaticRoute?.namespace || '',
  });

  return isLoading ? (
    <Skeleton />
  ) : error ? (
    <ErrorLabel>{error}</ErrorLabel>
  ) : (
    <InfoPaneCRD yaml={YAML.stringify(cleanDeep(data))} />
  );
};

export default CRD;
