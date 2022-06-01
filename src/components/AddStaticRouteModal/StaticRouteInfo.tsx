import {Form, Input, Select} from 'antd';

import {useGetNamespacesQuery} from '@redux/services/enhancedApi';

const StaticRouteInfo = (): JSX.Element => {
  const {data: namespaces} = useGetNamespacesQuery();
  return (
    <>
      <Form.Item
        name={['routeInfo', 'name']}
        label="Name"
        rules={[
          {
            required: true,
            message: 'type the name of the route',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['routeInfo', 'namespace']}
        label="Namespace"
        rules={[{required: true, message: 'Select target namespace'}]}
      >
        <Select>
          {namespaces?.map(namespace => (
            <Select.Option key={namespace.name} value={namespace.name}>
              {namespace.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default StaticRouteInfo;
