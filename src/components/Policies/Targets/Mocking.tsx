import {Typography} from 'antd';

import {ExclamationCircleOutlined} from '@ant-design/icons';

const Mocking = () => {
  return (
    <div style={{marginTop: 16}}>
      <ExclamationCircleOutlined style={{marginRight: 16}} />
      <Typography.Text>
        Mocking is inheritable - if it is specified on the path or root level it will include every operation below it.
      </Typography.Text>
    </div>
  );
};

export default Mocking;
