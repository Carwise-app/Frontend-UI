import { Box } from '@mui/material'
import NoCrashIcon from '@mui/icons-material/NoCrash';
import SellIcon from '@mui/icons-material/Sell';
import CardQuickTransactions from '../components/CardQuickTransactions';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from 'react'
import ControlPanelHeader from './ControlPanelHeader';

export default function QuickTransactions() {
  return (
    <>
        <ControlPanelHeader icon={<GridViewIcon sx={{fontSize:115,color:'black',opacity:0.1,marginRight:1}}/>} title="Hızlı İşlemler" description="Bu sekmede hızlı bir şekilde işlemlere ulaşabilirsiniz." />
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <CardQuickTransactions icon={<FormatListBulletedIcon sx={{fontSize:50, color:'black'}}/>} title="İlan Ver" description="İlan ver, aracın CARWISE ile satılsın."/>
            <CardQuickTransactions icon={<NoCrashIcon sx={{fontSize:50, color:'black'}}/>} title="Araç İlanlarını Gör" description="Hayalindeki araç için diğer satıcıların ilanlarına göz at."/>
            <Box className="md:col-span-2 md:justify-self-center w-full md:w-4/5  ">
                <CardQuickTransactions icon={<SellIcon sx={{fontSize:50, color:'black'}}/>} title="Arabam Ne Kadar ?" description="CARWISE'nın yeni yapay zeka aracı ile aracının marka, model, kilometre ve renk gibi özelliklerini söyle aracının değerinin ne olduğunı anında gör."/>
            </Box>
        </Box>
    </>
  )
}
