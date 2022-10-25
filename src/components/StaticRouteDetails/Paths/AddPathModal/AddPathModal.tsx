import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Form, Input, Steps} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';
import {closeStaticRoutePathModal} from '@redux/reducers/ui';

import {TargetForm} from '@components/TargetForm';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const AddPathModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  const [currentStep, setCurrentStep] = useState(0);
  const step = currentStep === 0 ? 'pathInfo' : 'targetInfo';

  const okText = currentStep === 0 ? 'Add target' : 'Create new path';

  const onSubmitHandler = async () => {
    await form.validateFields();

    if (step !== 'targetInfo') {
      setCurrentStep(currentStep + 1);
      return;
    }

    const {path, methods, upstream, redirect} = await form.getFieldsValue(true);
    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          paths: {
            [path]: methods.reduce((acc: any, item: any) => {
              acc[item] = redirect ? {redirect} : {route: {upstream}};
              return acc;
            }, {}),
          },
        },
      })
    );
    dispatch(closeStaticRoutePathModal());
  };

  const onBackHandler = () => {
    dispatch(closeStaticRoutePathModal());
  };

  const onStepClickHandler = async (value: number) => {
    await form.validateFields();
    setCurrentStep(value);
  };

  return (
    <S.Modal open title="Add Path" width="824px" onCancel={onBackHandler} onOk={onSubmitHandler} okText={okText}>
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={currentStep}>
            <Steps.Step title="Path" onStepClick={() => onStepClickHandler(0)} />
            <Steps.Step title="Target" onStepClick={() => onStepClickHandler(1)} />
          </Steps>
        </S.StepsContainer>
        <S.FormContainer>
          <Form preserve layout="vertical" form={form}>
            {step === 'pathInfo' && (
              <>
                <Form.Item
                  name="path"
                  label="Path"
                  rules={[
                    {required: true},
                    {pattern: /^\/.+$/, message: 'Path must begin with a forward slash “/”'},
                    {pattern: /^\/[/.a-zA-Z0-9-]+$/, message: 'Please enter a valid path'},
                    {
                      validator(rule, value) {
                        if (!Object.keys(selectedRouteSpec?.spec?.paths).includes(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(Error('Path already exists'));
                      },
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Operations" name="methods" rules={[{required: true}]} initialValue={['get']}>
                  <S.CheckboxGroup>
                    {METHODS.map(method => (
                      <S.Checkbox key={method} value={method} disabled={method === 'get'}>
                        {method.toUpperCase()}
                      </S.Checkbox>
                    ))}
                  </S.CheckboxGroup>
                </Form.Item>
              </>
            )}

            {step === 'targetInfo' && <TargetForm />}
          </Form>
        </S.FormContainer>
      </S.Container>
    </S.Modal>
  );
};

export default AddPathModal;
