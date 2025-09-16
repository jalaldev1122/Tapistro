import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import NodeItem from './NodeItem';

const Section = ({ title, children }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1, pl: 0.5 }}>
      {title}
    </Typography>
    <Stack spacing={1}>{children}</Stack>
  </Box>
);

const Sidebar = ({ onValidate, onAdd }) => {

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        height: '100vh',
        boxShadow: 1,

      }}
    >
      <Box sx={{ mb: 3, background: '#f3f4f6', padding: 2, borderBottom: '1px solid #e5e7eb' }}>
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Components
        </Typography>
        <Typography variant="caption" display="block" gutterBottom sx={{ color: 'text.secondary', mb: 1 }}>
          Select steps to build out your journey.
        </Typography>
      </Box>

      <Box sx={{ p: 1 }}>
        <List>
          <NodeItem type="emailNode" icon={<span style={{ fontSize: 18 }}>📧</span>}>
            Send Email
          </NodeItem>

          <NodeItem type="waitNode" icon={<span style={{ fontSize: 18 }}>⏱️</span>}>
            Wait
          </NodeItem>

          <NodeItem type="decisionNode" icon={<span style={{ fontSize: 18 }}>🔀</span>}>
            Decision Split
          </NodeItem>

          <NodeItem type="updateProfileNode" icon={<span style={{ fontSize: 18 }}>📝</span>}>
            Update Profile
          </NodeItem>
        </List>
      </Box>
      <Box sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,

      }}>
        <Button variant="contained" color="primary" fullWidth onClick={onValidate} >
          Validate Workflow
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
