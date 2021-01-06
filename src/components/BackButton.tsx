import { IconButton } from '@material-ui/core';
import React from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();
  return (
    <IconButton
      onClick={() => history.push('/jobs')}
      edge="start"
      style={{ marginLeft: 30 }}
      aria-label="menu"
    >
      <KeyboardBackspaceIcon fontSize="large" />
    </IconButton>
  );
};
export default BackButton;
