import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const H2 = styled.h2`
  color: blue;
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
  background-color: lightgray;
`;

function GG() {
  const userName = "GG";

  return (
    <div>
      <H2>{userName}</H2>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
      
    </div>
  );
}
export default GG;