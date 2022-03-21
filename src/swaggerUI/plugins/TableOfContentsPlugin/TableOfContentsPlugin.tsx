import {Provider} from 'react-redux';

import {store} from '@redux/store';

import {TableOfContents} from '@components/TableOfContents';

const TableOfContentsPlugin = (system: any) => ({
  wrapComponents: {
    info: (Original: any) => (props: any) => {
      const {layoutActions, specSelectors} = system.getSystem();

      const spec = specSelectors.specJson().toJS();

      return (
        <>
          <Original {...props} />

          <Provider store={store}>
            <TableOfContents layoutActions={layoutActions} spec={spec} />
          </Provider>
        </>
      );
    },
  },
});

export default TableOfContentsPlugin;
