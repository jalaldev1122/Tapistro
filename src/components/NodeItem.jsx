import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';


const NodeItem = ({ type, children, selected = false, icon }) => {
  return (
    <ListItemButton
      draggable
      onDragStart={(e) => e.dataTransfer.setData('application/reactflow', type)}
      sx={(theme) => ({
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center',
        padding:.5,
        gap: 1,
        '&:hover': {
          backgroundColor: '#e6c9ff',
          borderRadius: 2,
          opacity: 1,
        },
        // when hovering the whole list item, target child elements
        '&:hover .node-icon': {
          color: '#8121d6',
        },
        '&:hover .node-text': {
          opacity: 1,
        },
      })}
    >
      <ListItemIcon className="node-icon" sx={{ p: 1.5, background: '#f3f4fb', minWidth: 'auto', borderRadius: 1.5, mr: 2, color: '#9CA3AF' }}>
        {icon}
      </ListItemIcon>
      <Typography className="node-text" sx={{ opacity: 0.7 }} fontWeight={600} fontFamily={'Inter, sans-serif'}>
        {children}
      </Typography>
    </ListItemButton>

  );
};

export default NodeItem;