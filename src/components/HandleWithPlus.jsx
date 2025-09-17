import React from 'react';
import { Handle } from '@xyflow/react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

/**
 * HandleWithPlus
 * Props passed through to underlying Handle. Adds a centered plus overlay.
 */
const HandleWithPlus = ({ id, type, position, style = {}, overlayOffset = -10, overlayColor = '#8121d6', ...rest }) => {
  const overlayBase = {
    position: 'absolute',
    left: '50%',
    pointerEvents: 'none',
    zIndex: 2,
  };

  const posStr = position ? String(position).toLowerCase() : '';
  const topOffsetBool = posStr.includes('top');
  const bottomOffsetBool = posStr.includes('bottom');

  // Ensure handle is above overlay and can receive pointer events
  const handleStyle = { ...(style || {}), zIndex: 3 };

  const overlayPositionStyle = topOffsetBool
    ? { top: `${overlayOffset}px`, transform: 'translate(-50%, -50%)' }
    : bottomOffsetBool
    ? { bottom: `${overlayOffset}px`, transform: 'translate(-50%, 50%)' }
    : { top: `${overlayOffset}px`, transform: 'translate(-50%, -50%)' };

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Handle id={id} type={type} position={position} style={handleStyle} {...rest} />

      <Box sx={{ ...overlayBase, ...overlayPositionStyle }}>
        <Box sx={{ bgcolor: '#fff', borderRadius: '50%', p: 0.25, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${overlayColor}` }}>
          <AddIcon sx={{ fontSize: 14, color: overlayColor }} />
        </Box>
      </Box>
    </Box>
  );
};

export default HandleWithPlus;
