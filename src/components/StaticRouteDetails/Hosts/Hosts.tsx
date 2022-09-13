import {useDispatch} from 'react-redux';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormCard';
import {FormList} from '@components/FormList';

const Hosts = () => {
  const dispatch = useDispatch();
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);

  const onSubmitClickHandler = (values: any) => {
    const {hosts} = values;
    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          hosts,
        },
      })
    );
  };

  return (
    <FormCard
      heading="Hosts"
      subHeading="Configure which domains your static route should listen to"
      formProps={{onFinish: onSubmitClickHandler}}
    >
      <FormList
        addButtonText="Add a new host"
        name={['hosts']}
        initialValue={selectedRouteSpec?.spec?.hosts}
        placeholder="e.g. example.com"
        requiredMessage="Enter host or delete this field."
      />
      <Divider />
    </FormCard>
  );
};
export default Hosts;
