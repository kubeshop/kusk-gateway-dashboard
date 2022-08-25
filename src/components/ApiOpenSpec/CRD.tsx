import {useTracking} from 'react-tracking';

import {Skeleton, Typography} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {useAppSelector} from '@redux/hooks';
import {useGetApiCrdQuery} from '@redux/services/enhancedApi';

import {InfoPaneCRD} from '@components';
import {ErrorLabel} from '@components/AntdCustom';

const CRD: React.FC = () => {
  useTracking({eventName: Events.API_CRD_LOADED, type: ANALYTIC_TYPE.ACTION}, {dispatchOnMount: true});
  const selectedAPI = useAppSelector(state => state.main.selectedApi);

  const {data, error, isLoading} = useGetApiCrdQuery({
    name: selectedAPI?.name || '',
    namespace: selectedAPI?.namespace || '',
  });

  return isLoading ? (
    <Skeleton />
  ) : error ? (
    <ErrorLabel>{error}</ErrorLabel>
  ) : (
    <>
      <Typography.Title level={3} style={{marginTop: 32, marginBottom: 16}}>
        Custom Resource Definition
      </Typography.Title>
      <InfoPaneCRD yaml={YAML.stringify(cleanDeep(data))} />
    </>
  );
};

export default CRD;
