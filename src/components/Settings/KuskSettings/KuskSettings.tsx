import {useState} from 'react';

import {Button, Form, Input, Modal} from 'antd';

import {AlertEnum} from '@models/alert';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {setApiEndpoint} from '@redux/reducers/main';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

const KuskSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const apiEndpoint = useAppSelector(state => state.main.apiEndpoint);
  const [isViewMode, setIsViewMode] = useState(true);

  const onFinishHandler = (values: any) => {
    Modal.confirm({
      title: `Save kusk API endpoint changes?`,
      content: (
        <p>
          Are you sure you want to edit the default kusk API endpoint?
          <br />
          <br />
          If you do, please ensure that CORS is configured accordingly and that the new endpoint is accessible from your
          browser.
        </p>
      ),
      okText: 'Yes, save',
      cancelText: 'Cancel',
      okType: 'primary',
      onOk: () => {
        dispatch(setApiEndpoint(values.apiEndpoint));
        dispatch(
          setAlert({title: `API endpoint was successfully set to ${values.apiEndpoint}`, type: AlertEnum.Success})
        );
        setIsViewMode(!isViewMode);
      },
    });
  };

  const onEditClickHandler = () => {
    setIsViewMode(!isViewMode);
  };

  return (
    <FormCard
      heading="kusk API endpoint"
      subHeading="Please provide the kusk API endpoint for your installation. The endpoint needs to be accessible from your browser."
      helpTopic="API endpoints"
      helpLink="https://docs.kusk.io/dashboard/overview"
      formProps={{layout: 'vertical', onFinish: onFinishHandler}}
      cardProps={{
        extra: isViewMode && (
          <Button type="default" onClick={onEditClickHandler}>
            Edit
          </Button>
        ),
      }}
      isViewMode={isViewMode}
      cancelEditMode={onEditClickHandler}
      disableResetForm
    >
      <Form.Item
        shouldUpdate
        label="API Endpoint"
        name="apiEndpoint"
        rules={[{required: true}]}
        initialValue={apiEndpoint}
      >
        <Input placeholder="Enter API endpoint" type="text" />
      </Form.Item>
      {!isViewMode && <S.Divider />}
    </FormCard>
  );
};

export default KuskSettings;
