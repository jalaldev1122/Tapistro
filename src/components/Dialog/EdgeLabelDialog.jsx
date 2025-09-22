// components/Dialog/EdgeLabelDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

export const EdgeLabelDialog = ({
  open,
  label,
  onCancel,
  onSave,
  onLabelChange,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Edit Edge Label</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          variant="outlined"
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};
