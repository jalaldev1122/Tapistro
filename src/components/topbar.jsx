// src/components/FlowChart/FlowActions.jsx

import React from 'react';
import { Box, Button } from '@mui/material';

export const Topbar = ({ onValidate, onSave }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
        display: 'flex',
        gap: 2,
      }}
    >
      <Button variant="contained" color="primary" onClick={onValidate}>
        Validate
      </Button>
      <Button variant="contained" color="success" onClick={onSave}>
        Save Flow
      </Button>
    </Box>
  );
};
