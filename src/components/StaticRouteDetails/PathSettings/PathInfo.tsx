import {Checkbox, Form, Input} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormCard';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const PathInfo = () => {
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  const methods = Object.keys(selectedRouteSpec?.spec?.paths[selectedRoutePath] || {});

  return (
    <FormCard
      heading="Paths"
      subHeading="Enter the paths to match. A static route must contain at least one path."
      formProps={{layout: 'vertical'}}
    >
      <Form.Item required name="path" label="Path" initialValue={selectedRoutePath}>
        <Input />
      </Form.Item>
      <Divider />

      <Form.Item label="Methods" name="methods" rules={[{required: true}]} initialValue={methods}>
        <Checkbox.Group style={{display: 'grid'}}>
          {METHODS.map(method => (
            <Checkbox style={{marginLeft: 0, marginTop: 16}} key={method} value={method}>
              {method.toUpperCase()}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
      <Divider />
    </FormCard>
  );
};
export default PathInfo;
