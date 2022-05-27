import {FormList} from '@components';

interface IProps {}

const Hosts: React.FC<IProps> = () => {
  return (
    <FormList
      addButtonText="Add host"
      name={['hosts', 'hosts']}
      placeholder="e.g. example.com"
      requiredMessage="Enter host or delete this field."
    />
  );
};

export default Hosts;
