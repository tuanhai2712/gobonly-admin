import React from 'react';
import NoResultSvg from './no-result.svg';
import styled from 'styled-components';
const NoResultFound = () => {
  return (
    <Container>
      <H3Styled>
        No result found
      </H3Styled>
      <img src={NoResultSvg} alt="No Result" />
    </Container>

  );
};

const H3Styled = styled.h3`
  color: #001529;
  font-size: 20px;
  font-weight: 700;
}
`
const Container = styled.div`
  width: 100%;
  text-align: center;
}
`

export default NoResultFound;
