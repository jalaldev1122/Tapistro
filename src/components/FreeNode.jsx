import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Position } from '@xyflow/react';
import HandleWithPlus from './HandleWithPlus';

const FreeNode = ({ id, data }) => {
    const [label, setLabel] = useState(data?.label || 'Free Node');

    const handleUpdate = (patch) => {
        if (data?.updateNode) data.updateNode(id, patch);
    };

    return (
        <Paper elevation={2} sx={{ minWidth: 180, padding: 1 }}>
            <Box>
                <TextField
                    fullWidth
                    size="small"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onBlur={() => handleUpdate({ label })}
                />
            </Box>
            <HandleWithPlus
                id="in"
                type="target"
                position={Position.Top}
                style={{ background: '#fff', border: '1px solid #8121d6' }}
                overlayOffset={-10}
                overlayColor={'#8121d6'}
            />
            <HandleWithPlus
                id="out"
                type="source"
                position={Position.Bottom}
                style={{ background: '#fff', border: '1px solid #8121d6' }}
                overlayOffset={-10}
                overlayColor={'#8121d6'}
            />

        </Paper>
    );
};

export default FreeNode;
