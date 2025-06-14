import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function ClickableChip({title, selected, onClick}) {
  return (
    <Chip
      label={title}
      onClick={onClick}
      size="medium"
      sx={{
        backgroundColor: selected ? '#dc143c' : 'transparent',
        color: selected ? 'white' : '#dc143c',
        border: '1px solid #dc143c',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: selected ? '#dc143c' : 'transparent',
          color: selected ? 'white' : '#dc143c',
        },
        '&:focus': {
          backgroundColor: selected ? '#dc143c' : 'transparent',
        }
      }}
    />
  );
}
