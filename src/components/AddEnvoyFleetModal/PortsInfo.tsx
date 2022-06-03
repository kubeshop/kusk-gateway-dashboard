import {Button, Form, Input} from 'antd';

import {MinusCircleOutlined} from '@ant-design/icons';

import {useGetServicesQuery} from '@redux/services/kuskApi';

const PortsInfo = (): JSX.Element => {
  const {data: services} = useGetServicesQuery({});
  return (
    <Form.Item label="Ports">
      <Form.List name={['portsInfo', 'ports']} initialValue={[{}]}>
        {(fields, {add, remove}) => (
          <div>
            {fields.map((field, index) => (
              <Form.Item
                name={[field.name]}
                rules={[
                  {required: true, min: 1, max: 65535, message: 'Type port number!'},
                  ({getFieldValue}) => ({
                    validator(_, value) {
                      if (
                        getFieldValue(['fleetInfo', 'serviceType']) === 'LoadBalancer' &&
                        services?.some(service => service.ports.some(p => p.port === Number(value)))
                      ) {
                        return Promise.reject(Error('Port is Already taken'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 16, margin: '4px 0'}}>
                  <Input style={{width: 200}} placeholder="type port number!" type="number" />
                  {index !== 0 && <MinusCircleOutlined style={{fontSize: 16}} onClick={() => remove(field.name)} />}
                </div>
              </Form.Item>
            ))}
            <Button onClick={add}>Add Port</Button>
          </div>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default PortsInfo;
