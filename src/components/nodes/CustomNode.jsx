import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data, id }) => {
  const profile = data?.profile;

  const label = data?.label || {
    emailNode: 'Send Email',
    waitNode: 'Wait',
    decisionNode: 'Decision',
    updateProfileNode: 'Update Profile',
  }[data?.type] || data?.type || 'Node';

  const renderIcon = () => {
    switch (data?.type) {
      case 'emailNode':
        return '📧';
      case 'waitNode':
        return '⏱️';
      case 'decisionNode':
        return '🔀';
      case 'updateProfileNode':
        return '📝';
      default:
        return data?.label?.[0] || '•';
    }
  };

  const duration = data?.duration;
  const emailPreview = data?.subject || data?.emailTemplatePreview || '';

  return (
    <Paper elevation={3} sx={{ p: 1, minWidth: 180, bgcolor: '#6a1b9a', color: '#fff', position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(255,255,255,0.15)' }}>{renderIcon()}</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {label}
          </Typography>

          {data?.type === 'emailNode' && (
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {emailPreview || 'No subject set'}
            </Typography>
          )}

          {data?.type === 'waitNode' && (
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {duration ? `${duration}s` : 'Duration not set'}
            </Typography>
          )}

          {data?.type === 'updateProfileNode' && profile && (
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {profile.name} • {profile.role}
            </Typography>
          )}
        </Box>
      </Box>
      <Handle type="target" position={Position.Top} style={{ background: '#222' }} />
      <Handle type="source" position={Position.Top} style={{ background: '#222' }} />
    </Paper>
  );
};

export default CustomNode;
