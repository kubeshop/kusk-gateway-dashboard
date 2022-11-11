import {useDispatch} from 'react-redux';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {FormCard, FormList} from '@components/FormComponents';

import * as S from './styled';

const Hosts = () => {
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  const onSubmitHandler = (values: any) => {
    dispatch(updateApiSettings({editedOpenapi: values}));
  };
  return (
    <FormCard
      heading="Hosts"
      subHeading="Configure which domains your api should listen to"
      helpTopic="Hosts"
      helpLink="https://docs.kusk.io/extension/#hosts"
      formProps={{onFinish: onSubmitHandler}}
    >
      <FormList
        addButtonText="Add a new host"
        name={['x-kusk', 'hosts']}
        placeholder="e.g. example.com"
        requiredMessage="Enter host or delete this field."
        initialValue={xKusk?.hosts}
        required
      />

      <S.Divider />
    </FormCard>
  );
};

export default Hosts;
