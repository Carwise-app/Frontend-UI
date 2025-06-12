import React from 'react'
import ControlPanelHeader from './ControlPanelHeader'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function MyMessages() {
  return (
    <ControlPanelHeader icon={<MailOutlineIcon sx={{fontSize:115,color:'black',opacity:0.1,marginRight:1}}/>} title="Mesajlarım" description="Buradan kullancılarla olan sohbetlerinizi görebilirsiniz."/>
  )
}
