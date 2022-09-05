import {VFC, useRef} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Select, Tag} from 'antd';

import {BaseSelectRef} from 'rc-select';

import {openEnvoyFleetModalModal} from '@redux/reducers/ui';
import {useGetEnvoyFleetsQuery} from '@redux/services/enhancedApi';

import * as S from './FleetDropdown.styled';

const FleetDropdown: VFC = props => {
  const dispatch = useDispatch();
  const deploymentRef = useRef<BaseSelectRef | null>(null);
  const {data: envoyFleets} = useGetEnvoyFleetsQuery({});

  const onAddDeploymentClickHandler = () => {
    deploymentRef?.current?.blur();
    setTimeout(() => {
      dispatch(openEnvoyFleetModalModal());
    }, 100);
  };

  return (
    <Select ref={deploymentRef} {...props}>
      {envoyFleets?.map(fleet => (
        <Select.Option key={fleet.name} value={`${fleet.namespace},${fleet.name}`}>
          <Tag>{fleet.namespace}</Tag>
          {fleet.name}
        </Select.Option>
      ))}
      <Select.Option disabled value="00">
        <S.AddDeploymentOption>
          <Button type="primary" onClick={onAddDeploymentClickHandler}>
            Add deployment target
          </Button>
        </S.AddDeploymentOption>
      </Select.Option>
    </Select>
  );
};

export default FleetDropdown;
