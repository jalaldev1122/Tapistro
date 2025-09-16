import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';

const DecisionNode = ({ id, data }) => {
  return (
    <Paper elevation={3} sx={{ p: 1, minWidth: 180, bgcolor: '#8e24aa', color: '#fff', position: 'relative' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#fff' }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        🔀 {data?.label || 'Decision Split'}
      </Typography>

      <Box sx={{ mt: 1 }}>
        <TextField
          label="Label"
          fullWidth
          size="small"
          defaultValue={data?.label}
          onBlur={(e) => data?.updateNode?.(id, { label: e.target.value })}
        />
      </Box>

      {/* Example of two outgoing handles for branching */}
      <Handle id="yes" type="source" position={Position.Bottom} style={{ left: '30%', background: '#fff' }} />
      <Handle id="no" type="source" position={Position.Bottom} style={{ left: '70%', background: '#fff' }} />
    </Paper>
  );
};

export default DecisionNode;
