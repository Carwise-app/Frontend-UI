import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React from 'react'
import LoginFormDialog from './LoginFormDialog';
import RegisterFormDialog from './RegisterFormDialog';
import ForgotPasswprdFormDialog from './ForgotPasswordFormDialog';
import SuccessDialog from './SuccessDialog';

export default function AuthDialog({ open, onClose, view, setView, onLoginSuccess }) {
    const isLogin = view ==="login";

    const componentMap = {
        login: <LoginFormDialog 
                    onSwitch={() => setView("register")} 
                    onForgotPassword={() => setView("password")} 
                />,
        register: <RegisterFormDialog 
                      onSwitch={() => setView("login")} 
                  />,
         password: <ForgotPasswordFormDialog
                       onSwitch={() => setView("login")} 
                       onSuccess={() => setView("success")}
                   />,
         success: <SuccessDialog 
                  />
    };

    const getTitle = () => {
        switch (view) {
            case 'login': return 'Giriş Yap';
            case 'register': return 'Kayıt Ol';
            case 'password': return 'Şifremi Unuttum';
            case 'success': return '';
            default: return '';
        }
    };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle className="flex justify-between items-center">
            <span className='text-xl'>{getTitle()}</span>
            <IconButton onClick={onClose}>
                <CloseIcon/>
            </IconButton>
        </DialogTitle>
        <DialogContent className="w-full min-w-[350px]">
            {componentMap[view]}
        </DialogContent>
    </Dialog>
  )
}
