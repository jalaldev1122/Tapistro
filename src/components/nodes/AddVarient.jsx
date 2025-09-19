import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useDispatch } from 'react-redux';
import { updateNode } from '../../store/flowSlice';


const AddVarient = ({ id, data }) => {
    const [subject, setSubject] = useState(data?.subject || '');
    const [body, setBody] = useState(data?.body || '');

    const dispatch = useDispatch();
    const handleUpdate = (field, value) => {
        dispatch(updateNode({ id, [field]: value }));
    };

    return (
        <Paper elevation={3} sx={{ width: 150, color: '#fff', position: 'relative', borderRadius: '50px', p: '4px' }}>
            <Handle
                type="target"
                position={Position.Top}
                style={{ background: '#fff', border: '1px solid #8121d6' }}
            />

            <Box sx={{
                borderRadius: '50px',
                background: '#8121d6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                width: '100%',
                p: 1
            }}>
                <AddCircleRoundedIcon />
                <p>Add Varient</p>
            </Box>
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ background: '#fff', border: '1px solid #8121d6' }}
            />
        </Paper>
    );
};

export default AddVarient;
