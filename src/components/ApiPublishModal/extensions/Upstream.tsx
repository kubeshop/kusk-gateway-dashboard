import {useEffect, useMemo, useState} from 'react';

import {Form, Radio, Skeleton, Tag} from 'antd';

import {useGetServicesQuery} from '@redux/services/enhancedApi';
import {ServiceItem} from '@redux/services/kuskApi';

import {ErrorLabel} from '@components/AntdCustom';

import * as S from './styled';

const {Option} = S.Select;

interface IProps {
  reference: string;
  setReference: (reference: string) => void;
  isRequiredFields: boolean;
}

const Upstream: React.FC<IProps> = props => {
  const {reference, setReference, isRequiredFields} = props;
  const form = Form.useFormInstance();
  const {data: services = [], ...servicesInfo} = useGetServicesQuery({});

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

    const upstreamService = form.getFieldValue(['upstream', 'service']);

    if (upstreamService) {
      form.setFieldsValue({service: upstreamService});
    } else {
      form.resetFields();
    }
  };

  const onServiceSelectHandler = (service: ServiceItem) => {
    setSelectedService(service);
  };

  useEffect(() => {
    const {upstream} = form.getFieldsValue(true);

    if (!upstream) {
      return;
    }

    if (!upstream.service && upstream.host) {
      setReference('host');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedService) {
      return;
    }
    form.setFieldsValue({
      upstream: {
        service: {
          name: selectedService.name,
          namespace: selectedService.namespace,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService, formService]);

  useEffect(() => {
    if (!formService) {
      return;
    }

    const service = services.find(s => `${s.namespace}-${s.name}` === formService);

    if (service) {
      setSelectedService(service);
    }
  }, [formService, services]);

  return (
    <>
      <S.Label>Upstream reference</S.Label>
      <S.RadioGroup value={reference} onChange={e => setReference(e.target.value)}>
        <Radio value="service">Service</Radio>
        <Radio value="host">Host</Radio>
      </S.RadioGroup>

      {reference === 'service' ? (
        <>
          {servicesInfo.isLoading ? (
            <Skeleton.Button />
          ) : servicesInfo.error ? (
            <ErrorLabel>{servicesInfo.error}</ErrorLabel>
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
                {services.map(serviceItem => (
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
                required: isRequiredFields,
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
                required: isRequiredFields,
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
                required: isRequiredFields,
                message: `Please ${selectedService ? 'choose' : 'enter'} a valid port!`,
              },
            ]}
          >
            {selectedService ? (
              <S.Select placeholder="Target port to which requests should be routed">
                {selectedServicePorts.map(port => (
                  <Option key={port} value={Number(port)}>
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
                required: isRequiredFields,
                message: 'Please enter hostname!',
              },
            ]}
          >
            <S.Input placeholder="e.g. example.com" />
          </Form.Item>
          <Form.Item
            label="Port"
            name={['upstream', 'host', 'port']}
            getValueFromEvent={e => Number(e.target.value)}
            rules={[
              {
                required: isRequiredFields,
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
