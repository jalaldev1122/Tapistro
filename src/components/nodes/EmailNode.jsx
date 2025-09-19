import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { updateNode } from '../../store/flowSlice';

const EmailNode = ({ id, data }) => {
  const [subject, setSubject] = useState(data?.subject || '');
  const [body, setBody] = useState(data?.body || '');
  const [templateId, setTemplateId] = useState(data?.emailTemplateId || '');

  const dispatch = useDispatch();
  const handleUpdate = (field, value) => {
    dispatch(updateNode({ id, [field]: value }));
  };

  return (
    <Paper elevation={3} sx={{ width: 300, color: '#fff', position: 'relative',borderRadius:'8px' }}>
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
          <SendIcon sx={{ transform: 'rotate(-35deg)', mr: 1, mt: -.5 }} fontSize="small" />
          <Typography sx={{ fontWeight: 600 }}>
            Email Message
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Template ID"
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
          onBlur={() => handleUpdate('emailTemplateId', templateId)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          onBlur={() => handleUpdate('subject', subject)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          multiline
          minRows={3}
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onBlur={() => handleUpdate('body', body)}
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

export default EmailNode;
