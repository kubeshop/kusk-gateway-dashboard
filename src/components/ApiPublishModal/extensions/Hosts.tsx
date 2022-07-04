import {FormList} from '@components';

const Hosts = (): JSX.Element => {
  return (
    <FormList
      addButtonText="Add host"
      name="hosts"
      placeholder="e.g. example.com"
      requiredMessage="Enter host or delete this field."
    />
  );
};

export default Hosts;
