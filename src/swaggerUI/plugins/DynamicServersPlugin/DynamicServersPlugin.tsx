import {lazy} from 'react';

const AddServerModal = lazy(() => import('@components/AddServerModal/AddServerModal'));

const DynamicServersPlugin = () => ({
  wrapComponents: {
    operations: (Original: any) => (props: any) => {
      const {oas3Actions, spec, specActions, specSelectors} = props;

      const specJson = spec().toJS().json;

      const updateSpecServers = (url: string) => {
        if (specJson.servers) {
          specJson.servers.push({url, description: ''});
        } else {
          specJson['servers'] = [{url, description: ''}];
        }

        specActions.updateJsonSpec(specJson);
        oas3Actions.setSelectedServer(url);
      };

      return (
        <>
          {specSelectors.isOAS3() && <AddServerModal addServerHandler={updateSpecServers} servers={specJson.servers} />}
          <Original {...props} />;
        </>
      );
    },
  },
});

export default DynamicServersPlugin;
