import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Checkbox, Form, Input, Select} from 'antd';

import YAML from 'yaml';

import {SUPPORTED_METHODS} from '@constants/constants';

import {AlertEnum} from '@models/alert';
import {StaticRoute} from '@models/main';

import {setAlert} from '@redux/reducers/alert';
import {closeStaticRouteModal} from '@redux/reducers/ui';
import {
  useCreateStaticRouteMutation,
  useGetNamespacesQuery,
  useGetStaticRoutesQuery,
} from '@redux/services/enhancedApi';

import {FleetDropdown} from '@components/FormComponents';

import {checkDuplicateStaticRoute} from '@utils/staticRoute';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const AddStaticRouteModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [createStaticRoute, {error, isError, reset}] = useCreateStaticRouteMutation();
  const {data: namespaces} = useGetNamespacesQuery();
  const {data: staticRoutes} = useGetStaticRoutesQuery({});

  const onSubmitHandler = async () => {
    await form.validateFields();
    const {name, namespace, deployment, path, methods} = await form.getFieldsValue(true);

    const newStaticRouteDefinition: StaticRoute = {
      apiVersion: 'gateway.kusk.io/v1alpha1',
      kind: 'StaticRoute',
      metadata: {
        name,
      },
      spec: {
        fleet: {
          name: deployment.split(',')[1],
          namespace: deployment.split(',')[0],
        },
        hosts: [],
        paths: {
          [path]: methods.reduce((acc: any, item: any) => {
            acc[item] = {};
            return acc;
          }, {}),
        },
      },
    };

    const result = await createStaticRoute({
      body: {
        name,
        namespace,
        envoyFleetNamespace: deployment.split(',')[0],
        envoyFleetName: deployment.split(',')[1],
        openapi: YAML.stringify(newStaticRouteDefinition),
      },
    }).unwrap();
    dispatch(
      setAlert({
        title: 'Static route deployed successfully',
        description: `${name} was deployed successfully in ${namespace} namespace!`,
        type: AlertEnum.Success,
      })
    );
    dispatch(closeStaticRouteModal());
    navigate(`/staticroute/${result.namespace}/${result.name}`);
  };

  const onBackHandler = () => {
    dispatch(closeStaticRouteModal());
  };

  return (
    <S.Modal
      visible
      title="Publish Static Route"
      width="824px"
      onCancel={onBackHandler}
      okText="Add static route"
      onOk={onSubmitHandler}
    >
      {isError && <S.Alert description={error?.message} message="Error" showIcon type="error" closable />}

      <Form
        preserve
        form={form}
        layout="vertical"
        name="staticRouteForm"
        onValuesChange={() => {
          if (isError) {
            reset();
          }
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          required
          dependencies={['namespace']}
          rules={[
            {required: true, message: 'Enter API name!'},
            {pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/, message: 'Wrong pattern!'},
            {max: 63, type: 'string', message: 'Name is too long!'},
            () => {
              return {
                validator(_, value) {
                  const namespace = form.getFieldValue('namespace');

                  if (namespace && checkDuplicateStaticRoute(staticRoutes || [], `${namespace}-${value}`)) {
                    return Promise.reject(new Error(`API name is already used in ${namespace} namespace!`));
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
              message: 'Please select envoy fleet!',
            },
          ]}
        >
          <FleetDropdown />
        </Form.Item>
        <Form.Item required name="path" label="Path">
          <Input />
        </Form.Item>

        <Form.Item label="Methods" name="methods" rules={[{required: true}]}>
          <Checkbox.Group>
            {METHODS.map(method => (
              <Checkbox key={method} value={method}>
                {method.toUpperCase()}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </S.Modal>
  );
};

export default AddStaticRouteModal;
