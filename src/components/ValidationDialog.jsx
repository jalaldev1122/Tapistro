import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';

const ValidationDialog = ({ open, onClose, validationResult = { errors: [], warnings: [] }, findNodeForMessage, highlightNode }) => {
  const hasErrors = validationResult.errors && validationResult.errors.length > 0;
  const hasWarnings = validationResult.warnings && validationResult.warnings.length > 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Workflow Validation</DialogTitle>
      <DialogContent>
        {(hasErrors || hasWarnings) ? (
          <List>
            {hasErrors && (
              <>
                <ListItem>
                  <ListItemText primary={`Errors (${validationResult.errors.length})`} />
                </ListItem>
                {validationResult.errors.map((e, idx) => (
                  <ListItem  key={`err-${idx}`} secondaryAction={
                    <Button size="small" onClick={() => { const nid = findNodeForMessage?.(e); if (nid) highlightNode?.(nid); }}>
                      Focus
                    </Button>
                  }>
                    <ListItemText primary={e} />
                  </ListItem>
                ))}
              </>
            )}

            {hasWarnings && (
              <>
                <ListItem>
                  <ListItemText primary={`Warnings (${validationResult.warnings.length})`} />
                </ListItem>
                {validationResult.warnings.map((w, idx) => (
                  <ListItem key={`warn-${idx}`}>
                    <ListItemText primary={w} />
                  </ListItem>
                ))}
              </>
            )}
          </List>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
            <Alert icon={<CheckCircleOutlineIcon fontSize="large" />} severity="success" sx={{ width: '100%', alignItems: 'center', fontWeight: 600 }}>
              No issues found — your workflow looks good 🎉
            </Alert>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{borderTop: '1px solid #eee'}}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValidationDialog;
