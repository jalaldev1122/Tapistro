import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { Handle, Position } from '@xyflow/react';

const EmailNode = ({ id, data }) => {
  const [editing, setEditing] = useState(false);
  const subject = data?.subject || '';
  const body = data?.body || '';

  const toggleEdit = () => setEditing((s) => !s);

  const save = () => {
    data?.updateNode?.(id, { subject, body });
    setEditing(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 1, minWidth: 220, bgcolor: '#1976d2', color: '#fff', position: 'relative' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#fff' }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          📧 {data?.label || 'Send Email'}
        </Typography>
        <Box>
          <IconButton size="small" onClick={toggleEdit} sx={{ color: 'white' }}>
            {editing ? <SaveIcon fontSize="small" /> : <EditIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Box>

      {editing ? (
        <Box sx={{ mt: 1 }}>
          <TextField
            label="Subject"
            fullWidth
            size="small"
            defaultValue={subject}
            onBlur={(e) => data?.updateNode?.(id, { subject: e.target.value })}
          />
          <TextField
            label="Body"
            fullWidth
            size="small"
            multiline
            minRows={3}
            defaultValue={body}
            onBlur={(e) => data?.updateNode?.(id, { body: e.target.value })}
            sx={{ mt: 1 }}
          />
        </Box>
      ) : (
        <Typography variant="caption" sx={{ mt: 1, display: 'block', opacity: 0.95 }}>
          {subject || 'No subject set'}
        </Typography>
      )}

      <Handle type="source" position={Position.Bottom} style={{ background: '#fff' }} />
    </Paper>
  );
};

export default EmailNode;
