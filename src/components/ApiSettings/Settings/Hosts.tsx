import {useDispatch} from 'react-redux';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {FormCard} from '@components/FormCard';
import {FormList} from '@components/FormList';

import * as S from './styled';

const Hosts = () => {
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec['x-kusk'];

  const onSubmitHandler = (values: any) => {
    dispatch(updateApiSettings({editedOpenapi: values}));
  };
  return (
    <FormCard
      heading="Hosts"
      subHeading="Configure which domains your api should listen to"
      helpTopic="Hosts"
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#hosts"
      formProps={{onFinish: onSubmitHandler}}
    >
      <FormList
        addButtonText="Add a new host"
        name={['x-kusk', 'hosts']}
        placeholder="e.g. example.com"
        requiredMessage="Enter host or delete this field."
        initialValue={xKusk?.hosts}
      />

      <S.Divider />
    </FormCard>
  );
};

export default Hosts;
