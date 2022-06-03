import {Form, Steps} from 'antd';

import {CheckCircleOutlined, InfoCircleOutlined} from '@ant-design/icons';

const {Step} = Steps;

interface IProps<T> {
  step: T;
  activeStep: T;
  setActiveStep: (step: T) => void;
}

const FormStep = <T extends string>({step, activeStep, setActiveStep}: IProps<T>) => {
  const form = Form.useFormInstance();

  const hasCompleted = form
    .getFieldsError()
    .filter(el => el.name.includes(step))
    .every(el => el.errors.length === 0 && form.isFieldTouched(el.name));
  const stepStatus = step === activeStep ? 'process' : hasCompleted ? 'finish' : 'wait';

  const onStepClick = () => {
    setActiveStep(step);
  };

  return (
    <Step
      style={{cursor: 'pointer'}}
      prefixCls="ant-steps"
      title={step}
      status={stepStatus}
      onClick={hasCompleted ? onStepClick : undefined}
      icon={hasCompleted ? <CheckCircleOutlined /> : <InfoCircleOutlined />}
    />
  );
};

export default FormStep;
