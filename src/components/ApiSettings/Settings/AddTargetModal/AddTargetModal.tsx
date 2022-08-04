import {useState} from 'react';

import {Form, Typography} from 'antd';

import Redirect from './Targets/Redirect';
import Upstream from './Targets/Upstream';

import * as S from './styled';

interface IProps {
  closeModal: () => void;
}

const AddTargetModal = ({closeModal}: IProps) => {
  const [targetSelection, setTargetSelection] = useState<string>('Upstream service');

  return (
    <S.Modal visible width="648px" title="Add a target" onCancel={closeModal}>
      <Form layout="vertical">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginBottom: 16}}>
          <Typography.Text>Type</Typography.Text>
          <S.Segmented
            value={targetSelection}
            options={['Upstream service', 'Upstream host', 'Redirect']}
            onChange={value => setTargetSelection(value.toString())}
          />
        </div>
        {targetSelection.startsWith('Upstream') ? (
          <Upstream reference={targetSelection === 'Upstream service' ? 'service' : 'host'} isRequiredFields={false} />
        ) : (
          <Redirect isRequiredFields={false} />
        )}
      </Form>
    </S.Modal>
  );
};
export default AddTargetModal;
