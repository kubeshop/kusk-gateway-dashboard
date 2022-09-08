import {useNavigate} from 'react-router-dom';

import {Button} from 'antd';

import Api404 from '@assets/api404.svg';

import * as S from './styled';

const ApiNotFound = () => {
  const navigate = useNavigate();
  const onBackClickHandler = () => {
    navigate('/');
  };
  return (
    <S.Container>
      <img src={Api404} />
      <S.H2>Page not found</S.H2>
      <S.Description>
        The page you are trying to access is unavailable, has been deleted or doesn’t exist.
      </S.Description>
      <Button type="primary" size="large" onClick={onBackClickHandler}>
        Back to dashboard
      </Button>
    </S.Container>
  );
};
export default ApiNotFound;
