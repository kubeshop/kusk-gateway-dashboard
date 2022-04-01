/// <reference path="../../../../../types.d.ts" />
import {useEffect, useState} from 'react';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

import {Skeleton} from 'antd';

import {useGetEnvoyFleet} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import yamlFile from '../../../../constants/fleetCRD.yaml';

import * as S from './styled';

const CRD: React.FC = () => {
  const [yamlText, setYamlText] = useState<string>('');

  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);

  // TODO: use data to show the actual CRD from endpoint
  const {error, loading} = useGetEnvoyFleet({
    name: selectedEnvoyFleet?.name || '',
    namespace: selectedEnvoyFleet?.namespace || '',
    queryParams: {crd: true},
  });

  useEffect(() => {
    fetch(yamlFile)
      .then(r => r.text())
      .then(text => {
        setYamlText(text);
      });
  }, []);

  return loading ? (
    <Skeleton />
  ) : error ? (
    <S.ErrorLabel>{error.message}</S.ErrorLabel>
  ) : (
    <S.CRDText language="yaml" style={atomDark} wrapLines wrapLongLines>
      {yamlText}
    </S.CRDText>
  );
};

export default CRD;
