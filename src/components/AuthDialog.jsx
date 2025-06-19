import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React from 'react'
import LoginFormDialog from './LoginFormDialog';
import RegisterFormDialog from './RegisterFormDialog';
import ForgotPasswordFormDialog from './ForgotPasswordFormDialog';
import SuccessDialog from './SuccessDialog';
import ChangeMailDialog from './ChangeMailDialog';
import EditProfileDialog from './EditProfileDialog';

export default function AuthDialog({ open, onClose, view, setView, onLoginSuccess, user }) {

    const componentMap = (onClose) => ({
        login: <LoginFormDialog 
                    onSwitch={() => setView("register")} 
                    onForgotPassword={() => setView("password")}
                    onClose={onClose} 
                    onLoginSuccess={onLoginSuccess}
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
        changePhoneNumber: <EditProfileDialog onClose={onClose} user={user} />,
        changeMail: <ChangeMailDialog onClose={onClose}/>,
        changeName: <EditProfileDialog onClose={onClose} user={user} />,
        editProfile: <EditProfileDialog onClose={onClose} user={user} />
    });

    const getTitle = () => {
        switch (view) {
            case 'login': return 'Giriş Yap';
            case 'register': return 'Kayıt Ol';
            case 'password': return 'Şifremi Unuttum';
            case 'success': return '';
            case 'changePhoneNumber' : return 'Profil Düzenle';
            case 'changeMail' : return 'Mail Adresi Güncelle';
            case 'changeName' : return 'Profil Düzenle';
            case 'editProfile' : return 'Profil Düzenle';
            default: return '';
        }
    };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={view === "changePhoneNumber" || view === "changeName" || view === "editProfile" ? "md" : "xs"} >
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
