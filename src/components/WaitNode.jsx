import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';

const WaitNode = ({ id, data }) => {
  const duration = data?.duration || 60;

  return (
    <Paper elevation={3} sx={{ p: 1, minWidth: 160, bgcolor: '#ff9800', color: '#000', position: 'relative' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#222' }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        ⏱️ {data?.label || 'Wait'}
      </Typography>

      <Box sx={{ mt: 1 }}>
        <TextField
          label="Duration (s)"
          type="number"
          size="small"
          defaultValue={duration}
          onBlur={(e) => data?.updateNode?.(id, { duration: Number(e.target.value) })}
        />
      </Box>

      <Handle type="source" position={Position.Bottom} style={{ background: '#222' }} />
    </Paper>
  );
};

export default WaitNode;
