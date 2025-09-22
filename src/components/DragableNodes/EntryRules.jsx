import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Handle, Position } from '@xyflow/react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Typography } from '@mui/material';

export const EntryRules = () => {

    return (
        <Box sx={{ position: 'relative', overflow: 'visible', width: 250 }}>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    color: '#fff',
                    background: 'black',
                    borderRadius: 1,
                    clipPath: 'polygon(50% 100%, 100% 80%, 100% 0%, 0% 0%, 0% 80%)',
                    position: 'relative',
                    zIndex: 5,
                    height: 50,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                        width: '100%',
                        py: 1,
                        px: 2,
                    }}
                >
                    <Typography fontSize={'12px'} fontWeight={700}>
                        Entry Rules
                    </Typography>
                    <KeyboardArrowDownRoundedIcon />
                </Box>
            </Paper>

            <Handle
                type="source"
                position={Position.Bottom}
                style={{
                    background: '#fff',
                    border: '1px solid #8121d6',
                    zIndex: 10,
                }}
            />
        </Box>
    );
};
