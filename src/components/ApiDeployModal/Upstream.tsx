import {useEffect, useMemo, useState} from 'react';

import {Form, FormInstance, Select, Skeleton, Tabs, Tag} from 'antd';

import {ServiceItem} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {ErrorLabel} from '@components/AntdCustom';

import * as S from './styled';

const {TabPane} = Tabs;
const {Option} = Select;

interface IProps {
  form: FormInstance<any>;
  openApiSpec: {[key: string]: any};
}

const Upstream: React.FC<IProps> = props => {
  const {form, openApiSpec} = props;

  const services = useAppSelector(state => state.main.services);

  const [selectedService, setSelectedService] = useState<ServiceItem>();
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  const selectedServicePorts = useMemo(() => {
    if (!selectedService) {
      return [];
    }

    return selectedService.ports?.map(port => port.port);
  }, [selectedService]);

  const onServiceSelectClearHandler = () => {
    setSelectedService(undefined);
    form.resetFields();
  };

  const onServiceSelectHandler = (service: ServiceItem) => {
    setSelectedService(service);
  };

  useEffect(() => {
    const upstreamService = openApiSpec['x-kusk']?.upstream?.service;

    if (!upstreamService) {
      return;
    }

    form.setFieldsValue({
      upstream: {
        service: {name: upstreamService.name, namespace: upstreamService.namespace, port: upstreamService.port},
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  useEffect(() => {
    if (!selectedService) {
      return;
    }

    form.setFieldsValue({
      upstream: {service: {name: selectedService.name, namespace: selectedService.namespace, port: undefined}},
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService]);

  return (
    <>
      <Tabs defaultActiveKey={upstreamReference} onChange={key => setUpstreamReference(key)}>
        <TabPane tab="Service" key="service">
          {services.isLoading ? (
            <Skeleton.Button />
          ) : services.error ? (
            <ErrorLabel>{services.error}</ErrorLabel>
          ) : (
            <Form.Item label="Cluster service" name="service">
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
                required: requiredUpstreamReference(upstreamReference, 'service'),
                message: 'Please enter name!',
              },
            ]}
          >
            <S.Input disabled={Boolean(selectedService)} />
          </Form.Item>

          <Form.Item
            label="Namespace"
            name={['upstream', 'service', 'namespace']}
            rules={[
              {
                required: requiredUpstreamReference(upstreamReference, 'service'),
                message: 'Please enter namespace!',
              },
            ]}
          >
            <S.Input disabled={Boolean(selectedService)} />
          </Form.Item>

          <Form.Item
            label="Port"
            name={['upstream', 'service', 'port']}
            rules={[
              {
                required: requiredUpstreamReference(upstreamReference, 'service'),
                message: `Please ${selectedService ? 'choose' : 'enter'} a valid port!`,
              },
            ]}
          >
            {selectedService ? (
              <S.Select placeholder="Select port">
                {selectedServicePorts.map(port => (
                  <Option key={port} value={port}>
                    {port}
                  </Option>
                ))}
              </S.Select>
            ) : (
              <S.Input type="number" />
            )}
          </Form.Item>
        </TabPane>

        <TabPane tab="Host" key="host">
          <Form.Item
            label="Hostname"
            name={['upstream', 'host', 'hostname']}
            rules={[
              {
                required: requiredUpstreamReference(upstreamReference, 'host'),
                message: 'Please enter hostname!',
              },
            ]}
          >
            <S.Input placeholder="e.g. example.com" />
          </Form.Item>

          <Form.Item
            label="Port"
            name={['upstream', 'host', 'port']}
            rules={[{required: requiredUpstreamReference(upstreamReference, 'host'), message: 'Please enter port!'}]}
          >
            <S.Input type="number" />
          </Form.Item>
        </TabPane>
      </Tabs>

      <S.ExtensionSubHeading>Rewrite</S.ExtensionSubHeading>
      <Form.Item label="Pattern" name={['upstream', 'rewrite', 'rewrite_regex', 'pattern']}>
        <S.Input />
      </Form.Item>

      <Form.Item label="Substitution" name={['upstream', 'rewrite', 'rewrite_regex', 'substitution']}>
        <S.Input />
      </Form.Item>
    </>
  );
};

const requiredUpstreamReference = (selectedReference: string, reference: string) => selectedReference === reference;

export default Upstream;
