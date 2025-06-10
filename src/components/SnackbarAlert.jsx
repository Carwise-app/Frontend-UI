import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export default function SnackbarAlert({open, message, severity, onClose}) {

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
        <Alert
            onClose={onClose}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
    </Snackbar> 
  );
}