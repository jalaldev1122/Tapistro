import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';

const UpdateProfileNode = ({ id, data }) => {
  const profile = data?.profile || {};

  return (
    <Paper elevation={3} sx={{ p: 1, minWidth: 220, bgcolor: '#388e3c', color: '#fff', position: 'relative' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#fff' }} />

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar src={profile.avatarUrl} alt={profile.name} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          📝 {data?.label || 'Update Profile'}
        </Typography>
      </Box>

      <Box sx={{ mt: 1 }}>
        <TextField
          label="Name"
          fullWidth
          size="small"
          defaultValue={profile.name}
          onBlur={(e) => data?.updateNode?.(id, { profile: { ...(profile || {}), name: e.target.value } })}
        />
        <TextField
          label="Role"
          fullWidth
          size="small"
          defaultValue={profile.role}
          onBlur={(e) => data?.updateNode?.(id, { profile: { ...(profile || {}), role: e.target.value } })}
          sx={{ mt: 1 }}
        />
      </Box>

      <Handle type="source" position={Position.Bottom} style={{ background: '#fff' }} />
    </Paper>
  );
};

export default UpdateProfileNode;
