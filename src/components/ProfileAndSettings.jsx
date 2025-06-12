import React from 'react'
import ControlPanelHeader from './ControlPanelHeader'
import SettingsIcon from '@mui/icons-material/Settings';

export default function ProfileAndSettings() {
  return (
    <ControlPanelHeader icon={<SettingsIcon sx={{fontSize:115,color:'black',opacity:0.1,marginRight:1}}/>} title="Profil & Ayarlar" description="Burada profilinizle alakalı düzenlemeler ve ayarlamalar yapabilirsiniz." />
  )
}
