import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import List from '@mui/material/List';
import NodeItem from './NodeItem';


const Sidebar = ({ onValidate }) => {
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
          <NodeItem type="emailNode" style={{ backgroundColor: "black" }} icon={<SendIcon style={{ color: "purple" }} />}>
            Send Email
          </NodeItem>

          <NodeItem type="waitNode" icon={<AccessTimeFilledIcon style={{ color: "purple" }} />}>
            Wait
          </NodeItem>

          <NodeItem type="decisionNode" icon={<AccountTreeRoundedIcon style={{ color: "purple" }} />}>
            Decision Split
          </NodeItem>

          <NodeItem type="updateProfileNode" icon={<AccountBoxRoundedIcon style={{ color: "purple", backgroundColor: "white" }} />}>
            Update Profile
          </NodeItem>
        </List>
      </Box>
      <Box sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,

      }}>
        <Button variant="contained" color="primary" style={{ backgroundColor: "#7d22d8" }} fullWidth onClick={onValidate} >
          Validate Workflow
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
