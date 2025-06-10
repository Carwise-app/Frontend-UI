import { FormControl, FormHelperText, InputLabel, OutlinedInput} from "@mui/material";
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useId } from 'react';

export default function PasswordControlLabel({title, value, onChange, error, helperText}) {
    const [showPassword, setShowPassword] = useState(false);
    const id = useId(); 
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
  return (
    <FormControl variant="outlined" fullWidth error={error}>
          <InputLabel htmlFor="outlined-adornment-password">{title}</InputLabel>
          <OutlinedInput
            id={id}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
  )
}
