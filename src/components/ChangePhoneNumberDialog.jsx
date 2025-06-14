import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useSnackbar } from '../context/SnackbarContext';
import React, { useState } from "react";

export default function ChangePhoneNumberDialog({onClose}) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false); 
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    if (onlyNumbers.length <= 10) {
      setPhone(onlyNumbers);
    }
  };

  const handleSendCode = () => {
    setCodeSent(true);
  };

  const handleCodeChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    if (onlyNumbers.length <= 6) { 
      setCode(onlyNumbers);
    }
  };
  
  const handleComplete = () => {
    showSnackbar("Telefon numaranız başarıyla değiştirildi","success");
    onClose(); 
  }

  return (
    <Box>
      <Box className="flex flex-col gap-y-3">
        <span>
          Onaylı cep telefonu numaranızı değiştirdiğinizde, ilanlarınızdaki iletişim
          bilgileriniz de değişecektir.
        </span>
        <Box className="flex text-lg gap-x-2">
          <span>Kayıtlı Numaranız:</span>
          <span className="font-bold tracking-wide">05436719437</span>
        </Box>
      </Box>

      <form className="flex flex-col gap-4 mt-7">
        <Box className="grid w-full grid-cols-[1fr_1fr] gap-x-4">
          <TextField
            label="Telefon Numarası"
            type="tel"
            value={phone}
            onChange={handleChange}
            inputProps={{ maxLength: 10 }}
            fullWidth
            disabled={codeSent}
            InputProps={{
              startAdornment: <InputAdornment position="start">+90</InputAdornment>,
            }}
          />
          <Button
            variant="contained"
            disabled={phone.length !== 10 || codeSent} 
            onClick={handleSendCode}
            sx={{
              backgroundColor: "#dc143c",
              textTransform: "capitalize",
              color: "white",
              "&:disabled": {
                backgroundColor: "rgba(220, 20, 60, 0.5)",
                color: "#ffffff",
                cursor: "not-allowed",
              },
            }}
            type="button"
          >
            Onay Kodu Gönder
          </Button>
        </Box>

        {codeSent && (
          <>
            <TextField
              label="Onay Kodu"
              type="tel"
              value={code}
              onChange={handleCodeChange}
              inputProps={{ maxLength: 4 }}
              fullWidth
            />
            <Button
              variant="contained"
              disabled={code.length !== 4}
              onClick={handleComplete}
              sx={{
                backgroundColor: "#dc143c",
                textTransform: "capitalize",
                color: "white",
                "&:disabled": {
                  backgroundColor: "rgba(220, 20, 60, 0.5)",
                  color: "#ffffff",
                  cursor: "not-allowed",
                },
              }}
              type="button"
            >
              Onayla
            </Button>
          </>
        )}
      </form>
    </Box>
  );
}
