import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { useDispatch } from 'react-redux';
import { updateNode } from '../../store/flowSlice';

const DecisionNode = ({ id, data }) => {
  const [label, setLabel] = useState(data?.label || 'Decision');
  const [yesLabel, setYesLabel] = useState(data?.yesLabel || 'Yes');
  const [noLabel, setNoLabel] = useState(data?.noLabel || 'No');

  const dispatch = useDispatch();
  const handleUpdate = (key, value) => {
    dispatch(updateNode({ id, [key]: value }));
  };

  return (
    <Paper elevation={3} sx={{ width: 250, color: '#fff', position: 'relative', borderRadius: '8px' }}>
      <Box
        sx={{
          background: '#8121d6',
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          border: '1px solid #8121d6',
          borderRadius: '8px 8px 0px 0px'
        }}
      >
        <CallSplitIcon sx={{ mr: 1 }} fontSize="small" />
        <Typography sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Node Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => handleUpdate('label', label)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          label="Yes Condition Label"
          value={yesLabel}
          onChange={(e) => setYesLabel(e.target.value)}
          onBlur={() => handleUpdate('yesLabel', yesLabel)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          label="No Condition Label"
          value={noLabel}
          onChange={(e) => setNoLabel(e.target.value)}
          onBlur={() => handleUpdate('noLabel', noLabel)}
        />
        <Handle type="target" position={Position.Top} style={{ background: '#8e24aa' }} />
        <Handle id={'no'} type="source" position={Position.Bottom} style={{ left: '60%', background: '#fff', border: '1px solid #8e24aa' }} />
        <Handle id={'yes'} type="source" position={Position.Bottom} style={{ left: '40%', background: '#fff', border: '1px solid #8e24aa' }} />
      </Box>
    </Paper>
  );
};

export default DecisionNode;
