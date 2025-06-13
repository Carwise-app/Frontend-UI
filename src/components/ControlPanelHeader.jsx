import { Box } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView';
import React from 'react'

export default function ControlPanelHeader({icon, title, description}) {
  return (
    <Box className="flex justify-between bg-[#ffcd37] rounded-b-lg">
        <Box className="flex flex-col justify-center py-10 text-white ps-10 ">
            <span className='text-3xl font-bold'>{title}</span>
            <span className='tracking-wide'>{description}</span>
        </Box>
        {icon}
    </Box>
  )
}
