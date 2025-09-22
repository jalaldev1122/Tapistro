import React, { useState } from 'react';
import {
  Paper, Typography, TextField, Box, MenuItem,
} from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import PersonIcon from '@mui/icons-material/Person';

const statuses = ['Active', 'Inactive', 'Pending'];
const subscriptions = ['Free', 'Premium', 'Enterprise'];

export const UpdateProfileNode = ({ id, data }) => {
  const profile = data?.profile || {};
  const [form, setForm] = useState({
    name: profile.name || '',
    email: profile.email || '',
    role: profile.role || '',
    status: profile.status || '',
    subscription: profile.subscription || '',
    tags: profile.tags || [],
    avatarUrl: profile.avatarUrl || '',
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleBlur = () => {
    data?.updateNode?.(id, { profile: { ...form } });
  };

  return (
    <Paper elevation={3} sx={{ minWidth: 280, color: '#fff', position: 'relative', borderRadius: '8px' }}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#fff', border: '1px solid #8121d6' }}
      />

      <Box
        sx={{
          background: '#8121d6',
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderRadius: '8px 8px 0px 0px'

        }}
      >
        <PersonIcon sx={{ mr: 1 }} fontSize="small" />
        <Typography sx={{ fontWeight: 600 }}>
          {data?.label || 'Update Profile'}
        </Typography>
      </Box>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <TextField
          fullWidth
          label="Full Name"
          size="small"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          onBlur={handleBlur}
        />
        <TextField
          fullWidth
          label="Email"
          size="small"
          type="email"
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
          onBlur={handleBlur}
        />
        <TextField
          fullWidth
          label="Role"
          size="small"
          value={form.role}
          onChange={e => handleChange('role', e.target.value)}
          onBlur={handleBlur}
        />
        <TextField
          select
          fullWidth
          label="Status"
          size="small"
          value={form.status}
          onChange={e => handleChange('status', e.target.value)}
          onBlur={handleBlur}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Subscription"
          size="small"
          value={form.subscription}
          onChange={e => handleChange('subscription', e.target.value)}
          onBlur={handleBlur}
        >
          {subscriptions.map((sub) => (
            <MenuItem key={sub} value={sub}>{sub}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Tags (comma-separated)"
          fullWidth
          size="small"
          value={form.tags.join(', ')}
          onChange={(e) =>
            handleChange('tags', e.target.value.split(',').map((tag) => tag.trim()))
          }
          onBlur={handleBlur}
        />
        <TextField
          label="Avatar URL"
          fullWidth
          size="small"
          value={form.avatarUrl}
          onChange={(e) => handleChange('avatarUrl', e.target.value)}
          onBlur={handleBlur}
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
