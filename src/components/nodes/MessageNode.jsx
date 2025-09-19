import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const MessageNode = ({ id, data }) => {
    return (
        <Paper elevation={3} sx={{ width: 320, color: '#fff', position: 'relative', borderRadius: '8px' }}>

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
                <Box display="flex" alignItems="center" justifyContent='center'>
                    <SendRoundedIcon sx={{ transform: 'rotate(-35deg)', mr: 1, mt: -.5 }} fontSize="small" />
                    <Typography sx={{ fontWeight: 600 }}>
                        Message
                    </Typography>
                </Box>
            </Box>

            <Box p={2}>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        background: '#fffeff',
                        borderRadius: 1,
                        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.07)',
                    }}
                >

                    <Box width={'60px'} sx={{ background: '#edeef2' }} height={'100px'} display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={1}>
                        <SendRoundedIcon sx={{ transform: 'rotate(-35deg)', color: '#8121d6', width: '200px', height: '30px' }} />
                    </Box>
                    <Typography color='black' fontWeight={700} fontFamily={'Inter, sans-serif'}>
                        Great news! An item that you wanted recently went on sale!.
                    </Typography>
                </Box>
            </Box>

            <Handle
                type="target"
                position={Position.Top}
                style={{ background: '#fff', border: '1px solid #8121d6', }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ background: '#fff', border: '1px solid #8121d6' }}
            />
        </Paper>
    );
};

export default MessageNode;
