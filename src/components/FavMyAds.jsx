import React from 'react'
import ControlPanelHeader from './ControlPanelHeader'
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function FavMyAds() {
  return (
    <ControlPanelHeader icon={<StarBorderIcon sx={{fontSize:115,color:'black',opacity:0.1,marginRight:1}}/>} title="Favori İlanlarım" description="Beğendiğiniz veya takip etmek istediğiniz ilanları burada görebilirsiniz." />
  )
}
