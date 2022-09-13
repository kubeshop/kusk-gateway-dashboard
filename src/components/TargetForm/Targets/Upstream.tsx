import {useEffect, useMemo, useState} from 'react';

import {Form, Input, Select, Skeleton, Tag} from 'antd';

import {useGetServicesQuery} from '@redux/services/enhancedApi';
import {ServiceItem} from '@redux/services/kuskApi';

import {ErrorLabel} from '@components/AntdCustom';

import * as S from './styled';

const {Option} = Select;

interface IProps {
  reference: 'service' | 'host';
  isRequiredFields: boolean;
}

const Upstream: React.FC<IProps> = props => {
  const {reference, isRequiredFields} = props;
  const form = Form.useFormInstance();
  const {data: services = [], ...servicesInfo} = useGetServicesQuery({});

  const [selectedService, setSelectedService] = useState<ServiceItem | undefined>();

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
  }, [selectedService]);

  return (
    <>
      {reference === 'service' ? (
        <>
          {servicesInfo.isLoading ? (
            <Skeleton.Button />
          ) : servicesInfo.error ? (
            <ErrorLabel>{servicesInfo.error}</ErrorLabel>
          ) : (
            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16}}>
              <Form.Item label="Cluster service" rules={[{required: true}]}>
                <Select
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
                </Select>
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
                  <Select placeholder="ex: 8080">
                    {selectedServicePorts.map(port => (
                      <Option key={port} value={Number(port)}>
                        {port}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Input type="number" placeholder="ex: 8080" />
                )}
              </Form.Item>
            </div>
          )}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
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
              <Input disabled placeholder="Name of the target Service in your cluster" />
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
              <Input disabled placeholder="Namespace of the target Service in your cluster" />
            </Form.Item>
          </div>
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
            <Input placeholder="e.g. example.com" />
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
            <Input placeholder="Target port to which requests should be routed" type="number" />
          </Form.Item>
        </>
      )}

      <S.ExtensionSubHeading>Rewrite</S.ExtensionSubHeading>
      <Form.Item label="Pattern" name={['upstream', 'rewrite', 'rewrite_regex', 'pattern']}>
        <Input placeholder="Regex pattern that should be rewritten" />
      </Form.Item>

      <Form.Item label="Substitution" name={['upstream', 'rewrite', 'rewrite_regex', 'substitution']}>
        <Input placeholder="Substitution for specified regex pattern" />
      </Form.Item>
    </>
  );
};

export default Upstream;
