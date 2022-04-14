import {useEffect} from 'react';

import {FormInstance} from 'antd';

import {FormList} from '@components';

interface IProps {
  form: FormInstance<any>;
  openApiSpec: {[key: string]: any};
}

const Hosts: React.FC<IProps> = props => {
  const {form, openApiSpec} = props;

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
