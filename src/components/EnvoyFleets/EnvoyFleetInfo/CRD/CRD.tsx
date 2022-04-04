/// <reference path="../../../../../types.d.ts" />
import {useEffect, useState} from 'react';

import {Skeleton} from 'antd';

import {useGetEnvoyFleetCRD} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {InfoPaneCRD} from '@components';
import {ErrorLabel} from '@components/AntdCustom';

import yamlFile from '../../../../constants/fleetCRD.yaml';

const CRD: React.FC = () => {
  const [yamlText, setYamlText] = useState<string>('');

  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);

  // TODO: use data to show the actual CRD from endpoint
  const {error, loading} = useGetEnvoyFleetCRD({
    name: selectedEnvoyFleet?.name || '',
    namespace: selectedEnvoyFleet?.namespace || '',
  });

  useEffect(() => {
    fetch(yamlFile)
      .then(r => r.text())
      .then(text => {
        setYamlText(text);
      });
  }, []);

  return loading ? <Skeleton /> : error ? <ErrorLabel>{error.message}</ErrorLabel> : <InfoPaneCRD yaml={yamlText} />;
};

export default CRD;
