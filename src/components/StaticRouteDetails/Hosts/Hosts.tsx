import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormCard';
import {FormList} from '@components/FormList';

const Hosts = () => {
  return (
    <FormCard heading="Hosts" subHeading="Configure which domains your static route should listen to">
      <FormList
        addButtonText="Add a new host"
        name={['x-kusk', 'hosts']}
        placeholder="e.g. example.com"
        requiredMessage="Enter host or delete this field."
      />
      <Divider />
    </FormCard>
  );
};
export default Hosts;
