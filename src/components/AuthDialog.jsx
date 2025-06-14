import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React from 'react'
import LoginFormDialog from './LoginFormDialog';
import RegisterFormDialog from './RegisterFormDialog';
import ForgotPasswordFormDialog from './ForgotPasswordFormDialog';
import SuccessDialog from './SuccessDialog';
import ChangePhoneNumberDialog from './ChangePhoneNumberDialog';
import ChangeMailDialog from './ChangeMailDialog';

export default function AuthDialog({ open, onClose, view, setView, onLoginSuccess }) {

    const componentMap = (onClose) => ({
        login: <LoginFormDialog 
                    onSwitch={() => setView("register")} 
                    onForgotPassword={() => setView("password")}
                    onClose={onClose} 
                />,
        register: <RegisterFormDialog 
                      onSwitch={() => setView("login")}
                      onClose={onClose} 
                  />,
        password: <ForgotPasswordFormDialog
                       onSwitch={() => setView("login")}
                       onSuccess={() => setView("success")}
                       onClose={onClose}
                   />,
        success: <SuccessDialog onClose={onClose} />,
        changePhoneNumber: <ChangePhoneNumberDialog onClose={onClose} />,
        changeMail: <ChangeMailDialog onClose={onClose}/>
    });

    const getTitle = () => {
        switch (view) {
            case 'login': return 'Giriş Yap';
            case 'register': return 'Kayıt Ol';
            case 'password': return 'Şifremi Unuttum';
            case 'success': return '';
            case 'changePhoneNumber' : return 'Telefon Numarası Güncelle';
            case 'changeMail' : return 'Mail Adresi Güncelle'
            default: return '';
        }
    };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={view === "changePhoneNumber" ? "sm" : "xs"} >
        <DialogTitle className="flex items-center justify-between">
            <span className='text-xl'>{getTitle()}</span>
            <IconButton onClick={onClose}>
                <CloseIcon/>
            </IconButton>
        </DialogTitle>
        <DialogContent className="w-full min-w-[350px]">
            {componentMap(onClose)[view]}
        </DialogContent>
    </Dialog>
  )
}
