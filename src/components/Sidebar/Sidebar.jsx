import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ScienceIcon from '@mui/icons-material/Science';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';


import List from '@mui/material/List';
import {SidebarItem} from './SidebarItem';
import colors from '../../theme/colors';

export const Sidebar = ({ onValidate }) => {
  return (
    <Box
      sx={{
        width: 280,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        height: '100vh',
        boxShadow: 1,
      }}
    >
      <Box sx={{ mb: 3, background: '#f3f4f6', padding: 2, borderBottom: '1px solid #e5e7eb', fontFamily: 'Inter, sans-serif' }}>
        <Typography gutterBottom sx={{ fontWeight: 700, color: colors.grey[800] }}>
          Components
        </Typography>
        <Typography sx={{ mb: 1, fontSize: '13px', color: colors.grey[500], fontFamily: 'Inter, sans-serif' }}>
          Select steps to build out your journey.
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 1, color: colors.grey[600], ml: 1 }}>Basic Components</Typography>
        <List>
          <SidebarItem type="emailNode" icon={<MailOutlineIcon />}>
            Send Email
          </SidebarItem>
          <SidebarItem type="messageNode" icon={<SendIcon sx={{ rotate: '-30deg' }} />}>
            Send Message
          </SidebarItem>
          <SidebarItem type="waitNode" icon={<AccessTimeFilledIcon />}>
            Delay
          </SidebarItem>
          <Typography sx={{ fontWeight: 700, mb: 1, color: colors.grey[600], ml: 1, mt: 3 }}>Flow Controls</Typography>
          <SidebarItem type="decisionNode" icon={<AccountTreeRoundedIcon />}>
            Decision Split
          </SidebarItem>
          <SidebarItem type="updateProfileNode" icon={<AccountBoxRoundedIcon />}>
            Audience Paths
          </SidebarItem>
          <SidebarItem
            type="actionPath"
            icon={<BoltOutlinedIcon sx={{ transform: 'rotate(5deg)', fontSize: 22, fontWeight: 700 }} />}
          >
            Action Paths
          </SidebarItem>
          <SidebarItem type="experimentPath" icon={<ScienceIcon />}>
            Experiment Paths
          </SidebarItem>
          <SidebarItem type="addVarient" icon={<AddCircleRoundedIcon />}>
            Add Varient
          </SidebarItem>
          <SidebarItem type="entryRules" icon={<PlayCircleFilledWhiteRoundedIcon />}>
            Entry Rules
          </SidebarItem>

        </List>
      </Box>
      <Box sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,
      }}>
        <Button variant="contained" color="primary" style={{ backgroundColor: colors.primary.main }} fullWidth onClick={onValidate} >
          Validate Workflow
        </Button>
      </Box>
    </Box>
  );
};
