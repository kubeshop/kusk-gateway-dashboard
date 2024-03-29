import {VFC, useRef} from 'react';
import {useDispatch} from 'react-redux';

import {Button, RefSelectProps, Select, Tag} from 'antd';

import {openEnvoyFleetModalModal} from '@redux/reducers/ui';
import {useGetEnvoyFleetsQuery} from '@redux/services/enhancedApi';

import * as S from './styled';

const FleetDropdown: VFC = props => {
  const dispatch = useDispatch();
  const deploymentRef = useRef<RefSelectProps>(null);
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
