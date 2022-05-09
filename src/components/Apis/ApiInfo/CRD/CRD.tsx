import {Skeleton} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {useGetApiCRD} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {InfoPaneCRD} from '@components';
import {ErrorLabel} from '@components/AntdCustom';

const CRD: React.FC = () => {
  const selectedAPI = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApiCRD({
    name: selectedAPI?.name || '',
    namespace: selectedAPI?.namespace || '',
  });

  return loading ? (
    <Skeleton />
  ) : error ? (
    <ErrorLabel>{error.message}</ErrorLabel>
  ) : (
    data && <InfoPaneCRD yaml={YAML.stringify(cleanDeep(data))} />
  );
};

export default CRD;
