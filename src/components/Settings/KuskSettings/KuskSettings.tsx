import {useState} from 'react';

import {Button, Form, Input} from 'antd';

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
    dispatch(setApiEndpoint(values.apiEndpoint));
    dispatch(setAlert({title: `API endpoint was successfully set to ${values.apiEndpoint}`, type: AlertEnum.Success}));
    setIsViewMode(!isViewMode);
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
      formProps={{initialValues: {apiEndpoint}, layout: 'vertical', onFinish: onFinishHandler}}
      cardProps={{
        extra: isViewMode && (
          <Button type="default" onClick={onEditClickHandler}>
            Edit
          </Button>
        ),
      }}
      isViewMode={isViewMode}
      cancelEditMode={onEditClickHandler}
    >
      <Form.Item label="API Endpoint" name="apiEndpoint" rules={[{required: true}]}>
        <Input placeholder="Enter API endpoint" type="text" />
      </Form.Item>
      {!isViewMode && <S.Divider />}
    </FormCard>
  );
};

export default KuskSettings;
