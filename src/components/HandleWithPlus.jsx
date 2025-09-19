import React from 'react';
import { Handle } from '@xyflow/react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

/**
 * HandleWithPlus
 * Props passed through to underlying Handle. Adds a centered plus overlay.
 */
const HandleWithPlus = ({ id, type, position, style = {}, overlayOffset = -10, overlayColor = '#8121d6', size = 12, ...rest }) => {
  const overlayBase = {
    position: 'absolute',
    left: '50%',
    pointerEvents: 'none',
    zIndex: 2,
  };

  const posStr = position ? String(position).toLowerCase() : '';
  const isTop = posStr.includes('top');
  const isBottom = posStr.includes('bottom');
  const isLeft = posStr.includes('left');
  const isRight = posStr.includes('right');

  // Provide sensible default handle dimensions based on position
  const defaultHandleStyle = isLeft || isRight
    ? { width: size * 1.6, height: size * 1.6, borderRadius: '50%', background: '#fff', border: `1px solid ${overlayColor}` }
    : { width: size * 1.6, height: size * 1.6, borderRadius: '50%', background: '#fff', border: `1px solid ${overlayColor}` };

  // Merge user provided style but keep zIndex high so it sits above overlay
  const handleStyle = { ...defaultHandleStyle, ...(style || {}), zIndex: 3 };

  // Overlay placement depends on position
  const overlayPositionStyle = isTop
    ? { top: `${overlayOffset}px`, transform: 'translate(-50%, -50%)' }
    : isBottom
    ? { bottom: `${overlayOffset}px`, transform: 'translate(-50%, 50%)' }
    : isLeft
    ? { left: `${overlayOffset}px`, top: '50%', transform: 'translate(-50%, -50%)' }
    : isRight
    ? { right: `${overlayOffset}px`, top: '50%', transform: 'translate(50%, -50%)' }
    : { top: `${overlayOffset}px`, transform: 'translate(-50%, -50%)' };

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Handle id={id} type={type} position={position} style={handleStyle} {...rest} />

      <Box sx={{ ...overlayBase, ...overlayPositionStyle }}>
        <Box sx={{ bgcolor: '#fff', borderRadius: '50%', width: size + 8, height: size + 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${overlayColor}` }}>
          <AddIcon sx={{ fontSize: size, color: overlayColor }} />
        </Box>
      </Box>
    </Box>
  );
};

export default HandleWithPlus;
