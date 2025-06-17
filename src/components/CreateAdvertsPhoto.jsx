import { Box, Button, IconButton, Toolbar, Tooltip  } from '@mui/material'
import React, { useRef, useState } from 'react'
import CustomizedSteppers from './CustomizedSteppers'
import { ReactSortable } from 'react-sortablejs';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from './SnackbarAlert';
import { useSnackbar } from '../context/SnackbarContext';

export default function CreateAdvertsPhoto({title, desc, allSteps, stepLabel, activeStep, onHandleNext, onHandleBack}) {

  const navigate = useNavigate()
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();
  const { showSnackbar } = useSnackbar()

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newFiles = selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: crypto.randomUUID(),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleSucces = () => {
    navigate("/")
    showSnackbar("İlanınız başarıyla oluşturuldu.", "success");
  }


  return (
   <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160'>
            <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-xs border-1 border-gray-100">
              <span className='mb-2 text-3xl'>{title}</span>
              <span className='text-sm text-gray-600'>{desc}</span>
            </Box>
            <Box className="w-[70%] mx-auto mt-5">
              <CustomizedSteppers allSteps={allSteps} activeStep={activeStep} />
            </Box>
            <Box className="flex justify-between items-center w-[70%] mx-auto mt-5">
              <Button onClick={onHandleBack} variant='outlined' color='error'>Geri</Button>
            </Box>
            <Box className="flex flex-col w-[70%] mx-auto mt-4 gap-y-4">
              <Box className="bg-white rounded-md shadow-xs ">
                <Box className="px-2 py-2">
                  <span className='text-lg'>{stepLabel}</span>
                </Box>  
              </Box>
              <Box >
                    <Box
                        onClick={() => fileInputRef.current.click()}
                        className="p-4 text-center border border-gray-400 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                        <p className="text-sm text-gray-600">Fotoğraflarınızı yüklemek için tıklayın veya sürükleyin</p>
                        <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                        />
                    </Box>
                    {files.length > 0 && (
                        
                     <ReactSortable
                        list={files}
                        setList={setFiles}
                        className="grid grid-cols-5 gap-4 p-5 mt-5 bg-white border-gray-100 rounded-md shadow-sx border-1"
                    >
                        {files.map((fileObj, index) => (
                        <Box
                            key={fileObj.id}
                            className="relative w-32 h-32 overflow-hidden border rounded shadow"
                        >
                            <img
                            src={fileObj.preview}
                            alt={`Fotoğraf ${index + 1}`}
                            className="object-cover w-full h-full"
                            />
                            {index === 0 && (
                            <span className="absolute top-0 left-0 px-2 py-1 text-xs text-white bg-blue-600 rounded-br">
                                Kapak
                            </span>
                            )}
                            <Tooltip title="Fotoğrafı sil" arrow placement="right">
                                <button
                                onClick={() => handleDelete(index)}
                                className="absolute flex items-center justify-center w-4 h-4 text-sm text-white bg-gray-500 rounded-full top-1 right-1 hover:bg-gray-700"
                                >
                                    -
                                </button>
                            </Tooltip>
                        </Box>
                        ))}
                    </ReactSortable>
                    )}
              </Box>
              <Box className="flex justify-end">
                    <Button className='w-[20%]' color='error' onClick={handleSucces}>
                        İlan Oluştur
                    </Button>
              </Box>
            </Box>
          </Box>
  )
}
