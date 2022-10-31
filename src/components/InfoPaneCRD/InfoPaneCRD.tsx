import {Suspense, lazy} from 'react';

import styled from 'styled-components';

interface IProps {
  yaml: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const Monaco = lazy(() => import('@components/Monaco/Monaco'));

const InfoPaneCRD = (props: IProps): JSX.Element => {
  const {yaml} = props;

  return (
    <Container>
      <Suspense fallback={null}>
        <Monaco openapi={yaml} />
      </Suspense>
    </Container>
  );
};

export default InfoPaneCRD;
