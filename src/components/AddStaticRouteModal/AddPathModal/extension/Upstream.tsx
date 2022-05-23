import {useEffect, useMemo, useState} from 'react';

import {Form, Radio, Skeleton, Tag} from 'antd';

import {ServiceItem} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {ErrorLabel} from '@components/AntdCustom';

import * as S from './styled';

const {Option} = S.Select;

interface IProps {
  reference: string;
  setReference: (reference: string) => void;
}

const Upstream: React.FC<IProps> = props => {
  const {reference, setReference} = props;
  const form = Form.useFormInstance();

  const services = useAppSelector(state => state.main.services);

  const formService = form.getFieldValue('service');

  const [selectedService, setSelectedService] = useState<ServiceItem | undefined>(formService || undefined);

  const selectedServicePorts = useMemo(() => {
    if (!selectedService) {
      return [];
    }

    return selectedService.ports?.map(port => port.port) || [];
  }, [selectedService]);

  const onServiceSelectClearHandler = () => {
    setSelectedService(undefined);
    form.setFieldsValue({
      upstream: {
        service: {
          name: undefined,
          namespace: undefined,
          port: undefined,
        },
      },
    });
  };

  const onServiceSelectHandler = (service: ServiceItem) => {
    setSelectedService(service);
  };

  useEffect(() => {
    if (!selectedService) {
      return;
    }

    form.setFieldsValue({
      upstream: {
        service: {
          name: selectedService.name,
          namespace: selectedService.namespace,
          port: undefined,
        },
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService, formService]);

  useEffect(() => {
    if (!formService) {
      return;
    }

    const service = services.items.find(s => `${s.namespace}-${s.name}` === formService);

    if (service) {
      setSelectedService(service);
    }
  }, [formService, services.items]);

  return (
    <>
      <S.Label>Upstream reference</S.Label>
      <S.RadioGroup value={reference} onChange={e => setReference(e.target.value)}>
        <Radio value="service">Service</Radio>
        <Radio value="host">Host</Radio>
      </S.RadioGroup>

      {reference === 'service' ? (
        <>
          {services.isLoading ? (
            <Skeleton.Button />
          ) : services.error ? (
            <ErrorLabel>{services.error}</ErrorLabel>
          ) : (
            <Form.Item label="Cluster service" name={['upstream', 'service', 'selector']}>
              <S.Select
                allowClear
                placeholder="Select cluster service"
                showSearch
                onClear={onServiceSelectClearHandler}
                onSelect={(value: any, option: any) => {
                  onServiceSelectHandler(option.service);
                }}
              >
                {services.items.map(serviceItem => (
                  <Option key={`${serviceItem.namespace}-${serviceItem.name}`} service={serviceItem}>
                    <Tag>{serviceItem.namespace}</Tag>
                    {serviceItem.name}
                  </Option>
                ))}
              </S.Select>
            </Form.Item>
          )}

          <Form.Item
            label="Name"
            name={['upstream', 'service', 'name']}
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <S.Input disabled={Boolean(selectedService)} placeholder="Name of the target Service in your cluster" />
          </Form.Item>

          <Form.Item
            label="Namespace"
            name={['upstream', 'service', 'namespace']}
            rules={[
              {
                required: true,
                message: 'Please enter namespace!',
              },
            ]}
          >
            <S.Input
              disabled={Boolean(selectedService)}
              placeholder="Namespace of the target Service in your cluster"
            />
          </Form.Item>

          <Form.Item
            label="Port"
            name={['upstream', 'service', 'port']}
            rules={[
              {
                required: true,
                message: `Please ${selectedService ? 'choose' : 'enter'} a valid port!`,
              },
            ]}
          >
            {selectedService ? (
              <S.Select placeholder="Target port to which requests should be routed">
                {selectedServicePorts.map(port => (
                  <Option key={port} value={port}>
                    {port}
                  </Option>
                ))}
              </S.Select>
            ) : (
              <S.Input type="number" placeholder="Target port to which requests should be routed" />
            )}
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item
            label="Hostname"
            name={['upstream', 'host', 'hostname']}
            rules={[
              {
                required: true,
                message: 'Please enter hostname!',
              },
            ]}
          >
            <S.Input placeholder="e.g. example.com" />
          </Form.Item>
          <Form.Item
            label="Port"
            name={['upstream', 'host', 'port']}
            rules={[
              {
                required: true,
                message: 'Please enter port!',
              },
            ]}
          >
            <S.Input placeholder="Target port to which requests should be routed" type="number" />
          </Form.Item>
        </>
      )}

      <S.ExtensionSubHeading>Rewrite</S.ExtensionSubHeading>
      <Form.Item label="Pattern" name={['upstream', 'rewrite', 'rewrite_regex', 'pattern']}>
        <S.Input placeholder="Regex pattern that should be rewritten" />
      </Form.Item>

      <Form.Item label="Substitution" name={['upstream', 'rewrite', 'rewrite_regex', 'substitution']}>
        <S.Input placeholder="Substitution for specified regex pattern" />
      </Form.Item>
    </>
  );
};

export default Upstream;
