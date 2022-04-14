import {useEffect} from 'react';

import {FormInstance} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {FormList} from '@components';

interface IProps {
  form: FormInstance<any>;
}

const Hosts: React.FC<IProps> = props => {
  const {form} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi) || {};

  useEffect(() => {
    const hosts = openApiSpec['x-kusk']?.hosts;

    if (!hosts) {
      return;
    }

    form.setFieldsValue({hosts});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

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
