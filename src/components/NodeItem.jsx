import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Draggable = styled(Paper, { shouldForwardProp: (p) => p !== 'selected' })(
  ({ theme, selected }) => ({
    padding: theme.spacing(1.25),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1),
    cursor: 'grab',
    background: selected ? theme.palette.primary.main : theme.palette.background.paper,
    color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
    boxShadow: selected ? theme.shadows[4] : theme.shadows[0],
  })
);

const NodeItem = ({ type, children, selected = false, icon }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component="div"
        onDragStart={(e) => e.dataTransfer.setData('application/reactflow', type)}
        draggable
        sx={{ '&:hover': { backgroundColor: '#e6c9ff', borderRadius: 1 } }}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText
          primary={
            <Draggable elevation={1} selected={selected} sx={{ boxShadow: 'none', p: 0, background: 'transparent' }}>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                {children}
              </Typography>
            </Draggable>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NodeItem;
