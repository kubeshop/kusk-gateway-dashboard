import {AddServerModal} from '@components/AddServerModal';

import * as S from './DynamicServersPlugin.styled';

const DynamicServersPlugin = () => ({
  wrapComponents: {
    ServersContainer: (Original: any) => (props: any) => {
      const {oas3Actions, spec, specActions} = props;

      const specJson = spec().toJS().json;

      const updateSpecServers = (url: string) => {
        specJson.servers.push({url, description: ''});
        specActions.updateJsonSpec(specJson);
        oas3Actions.setSelectedServer(url);
      };

      return (
        <S.ServersContainer>
          <AddServerModal addServerHandler={updateSpecServers} />

          <Original {...props} />
        </S.ServersContainer>
      );
    },
  },
});

export default DynamicServersPlugin;
