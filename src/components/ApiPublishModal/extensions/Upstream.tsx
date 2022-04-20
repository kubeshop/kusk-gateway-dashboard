import {useEffect, useMemo, useState} from 'react';

import {Form, FormInstance, Radio, Select, Skeleton, Tag} from 'antd';

import {ServiceItem} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {ErrorLabel} from '@components/AntdCustom';

import * as S from './styled';

const {Option} = Select;

interface IProps {
  form: FormInstance<any>;
  reference: string;
  setReference: (reference: string) => void;
}

const Upstream: React.FC<IProps> = props => {
  const {form, reference, setReference} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi || {});
  const services = useAppSelector(state => state.main.services);

  const [selectedService, setSelectedService] = useState<ServiceItem>();

  const isApiMocked = useMemo(() => {
    if (!openApiSpec) {
      return false;
    }

    const mocking = openApiSpec['x-kusk']?.mocking?.enabled;

    if (mocking) {
      return true;
    }

    return false;
  }, [openApiSpec]);

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
    const upstream = openApiSpec['x-kusk'].upstream;

    if (!upstream) {
      return;
    }

    form.setFieldsValue({upstream});

    if (!upstream.service && upstream.host) {
      setReference('host');
    }

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
                required: !isApiMocked,
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
                required: !isApiMocked,
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
                required: !isApiMocked,
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
        </>
      ) : (
        <>
          <Form.Item
            label="Hostname"
            name={['upstream', 'host', 'hostname']}
            rules={[
              {
                required: !isApiMocked,
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
                required: !isApiMocked,
                message: 'Please enter port!',
              },
            ]}
          >
            <S.Input type="number" />
          </Form.Item>
        </>
      )}

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

export default Upstream;
