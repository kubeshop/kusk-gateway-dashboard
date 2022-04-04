/// <reference path="../../../../../types.d.ts" />
import {useEffect, useState} from 'react';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

import {Skeleton} from 'antd';

import {useGetStaticRoute} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {ErrorLabel} from '@components/AntdCustom';

import yamlFile from '../../../../constants/staticRouteCRD.yaml';

import * as S from './styled';

const CRD: React.FC = () => {
  const [yamlText, setYamlText] = useState<string>('');

  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);

  // TODO: use data to show the actual CRD from endpoint
  const {error, loading} = useGetStaticRoute({
    name: selectedStaticRoute?.name || '',
    namespace: selectedStaticRoute?.namespace || '',
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
    <ErrorLabel>{error.message}</ErrorLabel>
  ) : (
    <S.CRDText language="yaml" style={atomDark} wrapLines wrapLongLines>
      {yamlText}
    </S.CRDText>
  );
};

export default CRD;
