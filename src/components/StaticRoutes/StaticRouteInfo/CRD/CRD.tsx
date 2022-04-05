import {Skeleton} from 'antd';

import YAML from 'yaml';

import {useGetStaticRouteCRD} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {InfoPaneCRD} from '@components';
import {ErrorLabel} from '@components/AntdCustom';

const CRD: React.FC = () => {
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);

  const {data, error, loading} = useGetStaticRouteCRD({
    name: selectedStaticRoute?.name || '',
    namespace: selectedStaticRoute?.namespace || '',
  });

  return loading ? (
    <Skeleton />
  ) : error ? (
    <ErrorLabel>{error.message}</ErrorLabel>
  ) : (
    data && <InfoPaneCRD yaml={YAML.stringify(data)} />
  );
};

export default CRD;
