import {Skeleton} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {useAppSelector} from '@redux/hooks';
import {useGetEnvoyFleetCrdQuery} from '@redux/services/enhancedApi';

import {InfoPaneCRD} from '@components';
import {ErrorLabel} from '@components/AntdCustom';

const CRD: React.FC = () => {
  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);

  const {data, error, isLoading} = useGetEnvoyFleetCrdQuery({
    name: selectedEnvoyFleet?.name || '',
    namespace: selectedEnvoyFleet?.namespace || '',
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
