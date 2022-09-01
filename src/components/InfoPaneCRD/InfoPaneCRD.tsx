import styled from 'styled-components';

import {Monaco} from '@components/Monaco';

interface IProps {
  yaml: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const InfoPaneCRD = (props: IProps): JSX.Element => {
  const {yaml} = props;

  return (
    <Container>
      <Monaco openapi={yaml} />
    </Container>
  );
};

export default InfoPaneCRD;
