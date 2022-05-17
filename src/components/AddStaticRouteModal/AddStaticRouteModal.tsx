import {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Form, Steps} from 'antd';

import {AlertEnum} from '@models/alert';
import {useCreateStaticRoute} from '@models/api';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {closeStaticRouteModal, setStaticRouteModalActiveStep} from '@redux/reducers/ui';
import { StaticRouteStepType } from '@models/ui';

import FleetInfo from './FleetInfo';
import Hosts from './Hosts';
import Paths from './Paths';
import StaticRouteInfo from './StaticRouteInfo';
import Step from './Step';

import * as S from './styled';
import AddPathModal from './AddPathModal/AddPathModal';

const orderedSteps: Array<StaticRouteStepType> = ['routeInfo', 'fleetInfo', 'hosts', 'paths'];

const renderedNextButtonText: {[key: number]: string} = {
  0: 'Add Route Info',
  1: 'Add Fleet Info',
  2: 'Add Hosts',
  3: 'Add Paths',
  4: 'Publish',
};

const AddStaticRouteModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isCreatingRoute, setIsCreatingRoute] = useState<boolean>(false);
  const [openPathModal, setOpenPathModal] = useState<boolean>(false);

  const {mutate: createStaticRoute} = useCreateStaticRoute({});
  const activeStep = useAppSelector(state => state.ui.staticRouteModal.activeStep);

  const activeStepIndex = useMemo(() => orderedSteps.indexOf(activeStep), [activeStep]);

  const steps = useMemo(
    () => [
      {step: 'routeInfo', title: 'Route Info', documentationLink: ''},
      {
        step: 'fleetInfo',
        title: 'Fleet Info',
        documentationLink: '',
      },
      {
        step: 'hosts',
        title: 'Hosts',
        documentationLink: '',
      },
      {
        step: 'paths',
        title: 'Paths',
        documentationLink: '',
      },
    ],
    []
  );

  const onSubmitHandler = async () => {
    try {
      const values = await form.validateFields();
      setIsCreatingRoute(true);
      await createStaticRoute(values);
      dispatch(
        setAlert({
          title: 'Static route deployed successfully',
          description: `${''} was deployed successfully in ${''} namespace!`,
          type: AlertEnum.Success,
        })
      );
    } catch (e) {
      setIsCreatingRoute(false);
      dispatch(
        setAlert({
          title: "couldn't create the static route",
          description: `Something went wrong!`,
          type: AlertEnum.Error,
        })
      );
    }
  };

  const onBackHandler = () => {
    dispatch(closeStaticRouteModal());
  };

  const handleNextStep = () => {
    dispatch(setStaticRouteModalActiveStep(orderedSteps[activeStepIndex + 1]));
  };

  return (
    <S.Modal
      visible
      title="Publish Static Route"
      width="900px"
      onCancel={onBackHandler}
      footer={
        <>
          <Button type="text" onClick={onBackHandler}>
            Cancel
          </Button>

          {activeStep !== 'paths' ? (
            <Button type="default" onClick={handleNextStep}>
              {renderedNextButtonText[activeStepIndex]}
            </Button>
          ) : null}

          <Button type="primary" disabled={isCreatingRoute} loading={isCreatingRoute} onClick={onSubmitHandler}>
            {isCreatingRoute ? 'Publishing Route...' : 'Publish'}
          </Button>
        </>
      }
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStepIndex}>
            {steps.map(step => (
              <Step
                key={step.step}
                documentationLink={step.documentationLink}
                orderedSteps={orderedSteps}
                step={step.step}
                title={step.title}
              />
            ))}
          </Steps>
        </S.StepsContainer>

        <S.FormContainer>
          <Form.Provider>
            <Form form={form} layout="vertical">
              {activeStep === 'routeInfo' && <StaticRouteInfo />}
              {activeStep === 'fleetInfo' && <FleetInfo form={form} />}
              {activeStep === 'hosts' && <Hosts form={form} />}
              {activeStep === 'paths' && <Paths form={form} setAddPathModal={setOpenPathModal} />}
            </Form>
            {openPathModal && <AddPathModal setAddPathModal={setOpenPathModal} />}
          </Form.Provider>
        </S.FormContainer>
      </S.Container>
    </S.Modal>
  );
};

export default AddStaticRouteModal;
