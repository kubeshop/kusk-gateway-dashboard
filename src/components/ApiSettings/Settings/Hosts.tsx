import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormCard';
import {FormList} from '@components/FormList';

import * as S from './styled';

const Hosts = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec['x-kusk'];
  return (
    <FormCard
      heading="Hosts"
      subHeading="Configure which domains your api should listen to"
      helpTopic="Hosts"
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#hosts"
    >
      <FormList
        addButtonText="Add a new host"
        name="hosts"
        placeholder="e.g. example.com"
        requiredMessage="Enter host or delete this field."
        initialValue={xKusk?.hosts}
      />

      <S.Divider />
    </FormCard>
  );
};

export default Hosts;
