import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import PasswordControlLabel from '../components/PasswordControlLabel'
import { useSnackbar } from '../context/SnackbarContext';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tempErrors = {};
        if (password.length < 7 || !/[A-Z]/.test(password)) {
          tempErrors.password = "Şifre en az 7 karakter ve bir büyük harf içermelidir.";
        }
        if (password !== confirmPassword) tempErrors.confirmPassword = "Şifreler eşleşmiyor.";
        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            showSnackbar("Şifreniz başarıyla güncellendi","success");
            navigate("/")
        }
    }
  return (
    <Box className=" w-[35%] bg-white border-gray-100 rounded-md shadow-xs border-1 mx-auto mt-10">
        <Box className="flex flex-col w-[80%] py-5 gap-y-5 mx-auto">
            <Box className="text-2xl font-medium">
                <span className='text-[#dc143c]'>Şifre Yenileme</span>       
            </Box>
            <form onSubmit={handleSubmit}>
                <Box className="flex flex-col gap-y-5">
                    <PasswordControlLabel
                        title="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    
                    <PasswordControlLabel
                        title="Yeniden Şifre"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                    />
                    <Box className="flex justify-end">
                        <button type='submit' className='flex text-lg text-white rounded-md mt-2 cursor-pointer bg-[#dc143c] py-2 w-[45%] justify-center' >
                            <span>Şifreyi Yenile</span>
                        </button>
                    </Box>
                </Box>
            </form>
        </Box>
    </Box>
  )
}
