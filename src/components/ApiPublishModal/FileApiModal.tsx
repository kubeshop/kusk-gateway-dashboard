import {useDispatch} from 'react-redux';

import {Form, Input, Modal, Radio, Select} from 'antd';

import {closeFileApiModal} from '@redux/reducers/ui';
import {useGetApisQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';

import {checkDuplicateAPI} from '@utils/api';

import {FilePicker, FleetDropdown} from './FormComponents';

const FileApiModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form);
  const {data: apis} = useGetApisQuery({});
  const {data: namespaces} = useGetNamespacesQuery();

  const onBackHandler = () => {
    dispatch(closeFileApiModal());
  };

  return (
    <Modal visible title="Create an API from file" onCancel={onBackHandler} okText="Create API">
      <Form form={form} layout="vertical">
        <Form.Item required name="type" label="Import API via" initialValue="file">
          <Radio.Group>
            <Radio value="file">File</Radio>
            <Radio value="url">URL</Radio>
          </Radio.Group>
        </Form.Item>

        {type === 'file' ? (
          <Form.Item>
            <FilePicker />
          </Form.Item>
        ) : (
          <Form.Item required name="url" label="URL">
            <Input />
          </Form.Item>
        )}

        <Form.Item
          hasFeedback
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

                  if (namespace && checkDuplicateAPI(apis || [], `${namespace}-${value}`)) {
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

        <Form.Item
          name="namespace"
          label="Namespace"
          rules={[
            {
              required: true,
              message: 'Please select namespace!',
            },
          ]}
        >
          <Select>
            {namespaces?.map(el => (
              <Select.Option key={el.name} value={el.name}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          required
          name="envoyFleet"
          label="Deployment"
          rules={[
            {
              required: true,
              message: 'Please select envoy fleet!',
            },
          ]}
        >
          <FleetDropdown />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FileApiModal;
