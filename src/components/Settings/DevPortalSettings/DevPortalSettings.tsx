import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Form, Input} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {setDevPortalEndpoint} from '@redux/reducers/main';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

const DevPortalSettings = () => {
  const dispatch = useDispatch();
  const devPortalEndpoint = useAppSelector(state => state.main.devPortalEndpoint);
  const [isViewMode, setIsViewMode] = useState(true);

  const onFinishClickHandler = (values: any) => {
    dispatch(setDevPortalEndpoint(values.devPortalEndpoint));
    setIsViewMode(!isViewMode);
  };

  const onEditClickHandler = () => {
    setIsViewMode(!isViewMode);
  };

  return (
    <FormCard
      heading="Developer Portal"
      subHeading="Please provide the Kusk API endpoint for your installation. The endpoint needs to be accessible from your browser."
      helpTopic="Developer Portal"
      helpLink="https://docs.kusk.io/reference/dashboard/overview"
      formProps={{layout: 'vertical', onFinish: onFinishClickHandler}}
      isViewMode={isViewMode}
      cancelEditMode={onEditClickHandler}
      cardProps={{
        extra: isViewMode && (
          <Button type="default" onClick={onEditClickHandler}>
            Edit
          </Button>
        ),
      }}
    >
      <Form.Item
        name="devPortalEndpoint"
        label="Dev portal path"
        rules={[
          {required: true, message: 'Path is missing.'},
          {type: 'url', message: 'Invalid url.'},
        ]}
        initialValue={devPortalEndpoint}
      >
        <Input />
      </Form.Item>

      <Divider />
    </FormCard>
  );
};
export default DevPortalSettings;
