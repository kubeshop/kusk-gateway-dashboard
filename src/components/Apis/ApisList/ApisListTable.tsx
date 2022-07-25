import {useDispatch} from 'react-redux';

import {Modal, Typography} from 'antd';

import {MoreOutlined} from '@ant-design/icons';

import {AlertEnum} from '@models/alert';

import {setAlert} from '@redux/reducers/alert';
import {useDeleteApiMutation} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import {InfoPanelDeleteIcon} from '@components/AntdCustom';

import * as S from './ApisListTable.styled';

interface IProps {
  apis: ApiItem[];
}

const ApiMenuItems = [
  {
    label: '',
    icon: <MoreOutlined />,
    key: 'submenu',
    children: [{label: 'Delete', key: 'deleteResource', icon: <InfoPanelDeleteIcon />}],
  },
];

const ApisListTable: React.FC<IProps> = props => {
  const {apis} = props;
  const dispatch = useDispatch();
  const [deleteAPI] = useDeleteApiMutation();
  const onDeleteItemClick = async (api: ApiItem) => {
    Modal.confirm({
      title: `Do you want to delete ${api.name} api?`,
      onOk: async () => {
        if (api) {
          try {
            await deleteAPI({namespace: api?.namespace, name: api.name}).unwrap();
            dispatch(
              setAlert({
                title: 'API deleted successfully',
                description: `${api.name} was deleted successfully in ${api.namespace} namespace!`,
                type: AlertEnum.Success,
              })
            );
          } catch (e) {
            dispatch(
              setAlert({
                title: 'Deleting API was failed',
                description: `Something went wrong!`,
                type: AlertEnum.Error,
              })
            );
          }
        }
      },
    });
  };

  return (
    <S.Grid>
      {apis.map(api => (
        <S.GridItem key={`KEY_${api.name}`}>
          <Typography.Title level={4}>{api.name}</Typography.Title>
          <S.ApiInfoContainer>
            <S.ApiInfo>
              <S.InfoLabel>NAMESPACE</S.InfoLabel>
              <S.InfoTag>{api.namespace}</S.InfoTag>
            </S.ApiInfo>
            <S.ApiInfo>
              <S.InfoLabel>VERSION</S.InfoLabel>
              <Typography.Text>{api.version}</Typography.Text>
            </S.ApiInfo>

            <S.Menu selectable={false} mode="horizontal" items={ApiMenuItems} onClick={() => onDeleteItemClick(api)} />
          </S.ApiInfoContainer>
        </S.GridItem>
      ))}
    </S.Grid>
  );
};

export default ApisListTable;
