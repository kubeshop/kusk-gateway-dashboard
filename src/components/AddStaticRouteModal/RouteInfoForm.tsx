import {Form, Input, Select} from 'antd';

import {useGetNamespacesQuery, useGetStaticRoutesQuery} from '@redux/services/enhancedApi';

import {FleetDropdown} from '@components/FormComponents';

import {checkDuplicateStaticRoute} from '@utils/staticRoute';

const RouteInfo = () => {
  const form = Form.useFormInstance();
  const {data: namespaces} = useGetNamespacesQuery();
  const {data: staticRoutes} = useGetStaticRoutesQuery({});

  return (
    <>
      <Form.Item
        name="name"
        label="Name"
        required
        dependencies={['namespace']}
        rules={[
          {required: true, message: 'Enter Static route name'},
          {
            pattern: /^[a-z0-9].*[a-z0-9]$/gi,
            message: 'Name must start and end with an alphanumerical character',
          },
          {
            pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/,
            message: 'Name must contain only lowercase alphanumerical characters or "-"',
          },
          {max: 64, type: 'string', message: 'Maximum 64 characters'},
          () => {
            return {
              validator(_, value) {
                const namespace = form.getFieldValue('namespace');

                if (namespace && checkDuplicateStaticRoute(staticRoutes || [], `${namespace}-${value}`)) {
                  return Promise.reject(new Error(`API name is already used in ${namespace} namespace`));
                }

                return Promise.resolve();
              },
            };
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="namespace" label="Namespace" rules={[{required: true, message: 'Select target namespace'}]}>
        <Select>
          {namespaces?.map(namespace => (
            <Select.Option key={namespace.name} value={namespace.name}>
              {namespace.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Deployment"
        name="deployment"
        initialValue={form.getFieldValue('targetEnvoyFleet')}
        rules={[
          {
            required: true,
            message: 'Please select envoy fleet',
          },
        ]}
      >
        <FleetDropdown />
      </Form.Item>
    </>
  );
};

export default RouteInfo;
