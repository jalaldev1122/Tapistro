import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const WaitNode = ({ data }) => {
  const [duration, setDuration] = useState(data?.duration || 60);

  return (
    <Paper elevation={3} sx={{ minWidth: 250, color: '#fff', position: 'relative', borderRadius: '8px' }}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#fff', border: '1px solid #8121d6' }}
      />

      <Box
        sx={{
          background: '#8121d6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderRadius: '8px 8px 0px 0px'

        }}
      >
        <Box display="flex" alignItems="center">
          <AccessTimeIcon sx={{ mr: 1 }} fontSize="small" />
          <Typography sx={{ fontWeight: 600 }}>
            Wait
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Duration (seconds)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </Box>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#fff', border: '1px solid #8121d6' }}
      />
    </Paper>
  );
};
