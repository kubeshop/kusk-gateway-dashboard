import {Skeleton} from 'antd';

import YAML from 'yaml';

import {useGetEnvoyFleetCRD} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {InfoPaneCRD} from '@components';
import {ErrorLabel} from '@components/AntdCustom';

const CRD: React.FC = () => {
  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);

  const {data, error, loading} = useGetEnvoyFleetCRD({
    name: selectedEnvoyFleet?.name || '',
    namespace: selectedEnvoyFleet?.namespace || '',
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
